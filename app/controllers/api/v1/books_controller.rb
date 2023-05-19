class Api::V1::BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: %i[show edit update destroy]

  def index
    @books = current_user.books.all
  end

  def show
    if authorized?
      respond_to { |format| format.json { render :show } }
    else
      handle_unauthorized
    end
  end

  def create
    @book = current_user.books.build(book_params)

    if authorized?
      respond_to do |format|
        if @book.save
          format.json do
            render :show,
                    status: :created,
                    location: api_v1_book_path(@book)
          end
        else
          format.json do
            render json: @book.error, status: :unprocessable_entity
          end
        end
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |format|
        if @book.update(book_params)
          format.json do
            render :show,
                    status: :ok,
                    location: api_v1_book_path(@book_item)
          end
        else
          format.json do
            render json: @book.errors, status: :unprocessable_entity
          end
        end
      end
    else
      handle_unauthorized
    end
  end

  def destroy
    if authorized?
      @book.destroy
      respond_to { |format| format.json { head :no_content } }
    else
      handle_unauthorized
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :finished)
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def authorized?
    @book.user == curent_user
  end

  def handle_unauthorized
    unless authorized?
      respond_to { |format| format.json { render :unauthorized, status: 401 } }
    end
  end
end

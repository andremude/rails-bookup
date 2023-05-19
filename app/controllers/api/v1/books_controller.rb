class Api::V1::BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: %i[show edit update destroy]

  def index
    @books = current_user.books.all
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

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

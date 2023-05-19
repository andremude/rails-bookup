class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: %i[show edit update destroy]

  def index
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
end

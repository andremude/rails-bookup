require 'rails_helper'

RSpec.describe "Api::V1::BooksController", type: :request do
  let!(:user) { User.create(email: "paulj@example.com", password: "123456") }
  let!(:book) { Book.create(title: "Book", author: "Author", user: user) }
  let(:headers) { { "ACCEPT" => "application/json" } }

  before do
    post '/users/sign_in', params: { user: { email: user.email, password: user.password } }
    headers.merge!(response.headers.slice('access-token', 'client', 'uid'))
  end

  describe "GET #index" do
    it "returns a success response" do
      get '/api/v1/books', headers: headers
      expect(response).to have_http_status(200)
    end

    it "assigns books of the current user" do
      get '/api/v1/books', headers: headers
      expect(JSON.parse(response.body)).to eq([book.as_json])
    end
  end

  describe "POST #create" do
    let(:book_params) { { title: "New Book", author: "New Author", finished: false } }

    it "creates a new book for the current user if authorized" do
      expect { post "/api/v1/books", params: { book: book_params }, headers: headers }.to change { Book.count }.by(1)
      expect(response).to have_http_status(201)
      expect(Book.last.user).to eq(user)
    end
  end

  describe "PATCH #update" do
    let(:updated_book_params) { { title: "Updated Book" } }

    it "updates the book if authorized" do
      patch "/api/v1/books/#{book.id}", params: { book: updated_book_params }, headers: headers
      expect(response).to have_http_status(200)
      expect(book.reload.title).to eq(updated_book_params[:title])
    end
  end

  describe "DELETE #destroy" do
    it "destroys the book if authorized" do
      delete "/api/v1/books/#{book.id}", headers: headers
      expect(response).to have_http_status(204)
      expect(Book.exists?(book.id)).to be_falsey
    end
  end
end

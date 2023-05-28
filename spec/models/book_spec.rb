require 'rails_helper'

RSpec.describe Book, type: :model do
  describe "associations" do
    it "belongs to a user" do
      user = User.create(email: "john@example.com")
      book = Book.new(title: "Book", author: "Author")
      book.user = user
      expect(book.user).to eq(user)
    end
  end

  describe "validations" do
    it "requires a title" do
      book = Book.new(title: nil, author: "Author")
      expect(book).to_not be_valid
      expect(book.errors[:title]).to include("can't be blank")
    end

    it "requires an author" do
      book = Book.new(title: "Book", author: nil)
      expect(book).to_not be_valid
      expect(book.errors[:author]).to include("can't be blank")
    end
  end
end

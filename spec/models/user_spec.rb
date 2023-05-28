require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it "has many books" do
      user = User.create(email: "test@example.com", password: "password")
      book1 = Book.create(title: "Book 1", author: "Author 1", user: user)
      book2 = Book.create(title: "Book 2", author: "Author 2", user: user)
      expect(user.books).to match_array([book1, book2])
    end

    it "destroys associated books when destroyed" do
      user = User.create(email: "test@example.com", password: "password")
      book = Book.create(title: "Book", author: "Author", user: user)
      user.destroy
      expect(Book.exists?(book.id)).to be_falsey
    end
  end

end

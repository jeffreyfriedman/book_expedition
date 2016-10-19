class Book < ActiveRecord::Base
  validates :title, presence: true
  validates :author, presence: true

  has_many :book_locations, dependent: :destroy
  has_many :locations, through: :book_locations

  has_many :user_books, dependent: :destroy
  has_many :users, through: :user_books

  def self.search(search)
    where("title ILIKE ?", "%#{search}%")
    where("author ILIKE ?", "%#{search}%")
  end
end

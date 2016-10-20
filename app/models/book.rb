class Book < ActiveRecord::Base
  validates :title, presence: true
  validates :author, presence: true

  has_many :book_destinations, dependent: :destroy
  has_many :destinations, through: :book_destinations

  has_many :user_books, dependent: :destroy
  has_many :users, through: :user_books

  def self.search(search)
    where("title ILIKE ?", "%#{search}%")
    where("author ILIKE ?", "%#{search}%")
  end
end

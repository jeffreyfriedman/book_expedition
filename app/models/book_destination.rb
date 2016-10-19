class BookDestination < ActiveRecord::Base
  belongs_to :book
  belongs_to :destination

  validates :book, presence: true
  validates :destination, presence: true
end

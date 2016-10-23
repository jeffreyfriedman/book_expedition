class UserBook < ActiveRecord::Base
  belongs_to :user
  belongs_to :book

  validates :user, presence: true
  validates :book, presence: true
  validates :user, uniqueness: { scope: [:book] }
end

class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :location

  validates :user, presence: true
  validates :body, presence: true
  validates :location, presence: true
end

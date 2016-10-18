class UserDestination < ActiveRecord::Base
  belongs_to :user
  belongs_to :destination

  validates :user, presence: true
  validates :destination, presence: true
end

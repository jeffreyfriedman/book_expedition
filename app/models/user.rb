class User < ApplicationRecord
  has_many :user_destinations
  has_many :destinations, through: :user_destinations

  has_many :user_books, dependent: :destroy
  has_many :books, through: :user_books

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, uniqueness: true, presence: true
  validates :password, presence: true
  validates :email, presence: true,
    format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i },
    uniqueness: { case_sensitive: false }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def admin?
   role == "admin"
  end
end

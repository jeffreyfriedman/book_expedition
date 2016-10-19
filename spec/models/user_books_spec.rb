require 'rails_helper'

RSpec.describe UserBook, type: :model do
  user1 = FactoryGirl.create(:user)
  user2 = FactoryGirl.create(:user)
  book1 = FactoryGirl.create(:book)
  book2 = FactoryGirl.create(:book)

  after(:all) {User.destroy_all}

  it { should belong_to(:user) }
  it { should belong_to(:book) }

  it { should have_valid(:user).when(user1, user2) }
  it { should_not have_valid(:user).when(nil) }

  it { should have_valid(:book).when(book1, book2) }
  it { should_not have_valid(:book).when(nil) }
end

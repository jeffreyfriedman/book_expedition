require 'rails_helper'

RSpec.describe BookDestination, type: :model do
  destination1 = FactoryGirl.create(:destination)
  destination2 = FactoryGirl.create(:destination)
  book1 = FactoryGirl.create(:book)
  book2 = FactoryGirl.create(:book)

  it { should belong_to(:destination) }
  it { should belong_to(:book) }

  it { should have_valid(:destination).when(destination1, destination2) }
  it { should_not have_valid(:destination).when(nil) }

  it { should have_valid(:book).when(book1, book2) }
  it { should_not have_valid(:book).when(nil) }
end

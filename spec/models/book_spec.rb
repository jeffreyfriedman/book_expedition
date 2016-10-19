require 'rails_helper'

RSpec.describe Book, type: :model do
  it { should have_valid(:title).when('Rising Sun', '1984') }
  it { should_not have_valid(:title).when(nil, '') }
end

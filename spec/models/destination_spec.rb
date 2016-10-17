require 'rails_helper'

RSpec.describe Destination, type: :model do
  it { should have_valid(:country).when('Japan', 'France') }
  it { should_not have_valid(:country).when(nil, '') }
end

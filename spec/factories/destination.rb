FactoryGirl.define do
  factory :destination do
    sequence(:country) { |n| "country#{n}" }
    sequence(:city) { |n| "city#{n}" }
  end
end

FactoryGirl.define do
  factory :book do
    sequence(:title) { |n| "title#{n}" }
    sequence(:authors) { |n| "author#{n}" }
    sequence(:isbn) { |n| "isbn#{n}" }
    sequence(:url) { |n| "url#{n}" }
    sequence(:image) { |n| "image#{n}" }
  end
end

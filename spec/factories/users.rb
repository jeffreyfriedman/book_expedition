FactoryGirl.define do
  factory :user do
    sequence(:first_name) { |n| "#{n}firstname" }
    sequence(:last_name) { |n| "#{n}lastname" }
    sequence(:username) { |n| "#{n}username" }
    sequence(:email) { |n| "#{n}email@website.com" }
    sequence(:password) { |n| "#{n}password" }
  end
end

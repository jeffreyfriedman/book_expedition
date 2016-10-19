FactoryGirl.define do
  factory :user do
    sequence(:first_name) { |n| "firstname#{n}" }
    sequence(:last_name) { |n| "lastname#{n}" }
    sequence(:username) { |n| "username#{n}" }
    sequence(:email) { |n| "#{n}email@website.com" }
    sequence(:password) { |n| "password#{n}" }
  end
end

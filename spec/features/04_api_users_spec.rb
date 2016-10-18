require "rails_helper"

feature "API user interaction" do
  let!(:user) { FactoryGirl.create(:user, email: "emmawatson@gmail.com", password: "sixchar1") }
  let!(:new_first_name) {"emma"}
  let!(:new_last_name) {"watson"}
  let!(:new_username) {"emmawatsonisthebest"}
  let!(:new_password) {"sixchar2"}
  let!(:first_name) {""}
  let!(:last_name) {""}
  let!(:username) {""}
  let!(:email) {""}
  let!(:password) {""}

  scenario "user signs in and signs out" do
    user_sign_in(user)
    visit "/api/v1/users"

    expect(page).to have_content("userdata")
    expect(page).to have_content(user.id)
    expect(page).to have_content(user.first_name)
    expect(page).to have_content(user.last_name)
    expect(page).to have_content(user.username)
    expect(page).to have_content(user.email)
  end

  scenario "unauthenticated user attempts to access API" do
    null_content = "{\"userdata\":null,\"destinations\":null}"
    visit "/api/v1/users"

    expect(page).to have_content(null_content)
  end
end

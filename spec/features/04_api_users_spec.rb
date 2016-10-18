require "rails_helper"

feature "API user interaction" do
  let!(:user) { FactoryGirl.create(:user, email: "emmawatson@gmail.com", password: "sixchar1") }

  scenario "user signs in and signs out" do
    sign_in(user.email, user.password)
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

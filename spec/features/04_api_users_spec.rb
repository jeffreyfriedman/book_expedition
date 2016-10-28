require "rails_helper"

feature "API user interaction" do
  let!(:user99) { FactoryGirl.create(:user) }

  scenario "user signs in and signs out" do
    sign_in(user99.email, user99.password)
    visit "/api/v1/users"

    expect(page).to have_content("user_info")
    expect(page).to have_content(user99.first_name)
    expect(page).to have_content(user99.last_name)
    expect(page).to have_content(user99.username)
    expect(page).to have_content(user99.email)
  end

  scenario "unauthenticated user attempts to access API" do
    null_content = "{\"user_info\":null,\"destinations\":null,\"destination_notes\":null,\"books\":null,\"book_notes\":null,\"datamap\":null}"
    visit "/api/v1/users"

    expect(page).to have_content(null_content)
  end
end

require 'json'

class Api::V1::UsersController < ApiController
  def index
    unless current_user.nil?
      user_info = current_user.attributes.slice("first_name", "last_name", "username", "email")
      user_destinations = current_user.destinations.order(created_at: :desc)
      user_books = current_user.books.order(created_at: :desc)
      user_destination_notes = current_user.user_destinations.order(created_at: :desc)
      user_booknotes = current_user.user_books.order(created_at: :desc)
      user_datamap = generate_datamap
    end

    render json: {
      user_info: user_info,
      destinations: user_destinations,
      destination_notes: user_destination_notes,
      books: user_books,
      book_notes: user_booknotes,
      datamap: user_datamap
    }, status: :ok
  end

  private
  def generate_datamap
    username = current_user.username
    datamap_array = [JSON.parse('{"id": "'"#{username}"'", "value":""}')]

    current_user.books.each do |book|
      destination_value = "#{username}.#{book.destinations[0].country}"
      datamap_array << JSON.parse('{"id": "'"#{destination_value}"'", "value":""}')
      book_value = "#{username}.#{book.destinations[0].country}.#{book.title}"
      datamap_array << JSON.parse('{"id": "'"#{book_value}"'", "value":""}')
    end
    return datamap_array.uniq
  end
end

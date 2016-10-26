class Api::V1::UsersController < ApiController
  def index
    unless current_user.nil?
      user_info = current_user.attributes.slice("first_name", "last_name", "username", "email")
      user_destinations = current_user.destinations.order(created_at: :desc)
      user_books = current_user.books.order(created_at: :desc)
      user_destination_notes = current_user.user_destinations.order(created_at: :desc)
      user_booknotes = current_user.user_books.order(created_at: :desc)
    end
    render json: {
      user_info: user_info,
      destinations: user_destinations,
      destination_notes: user_destination_notes,
      books: user_books,
      book_notes: user_booknotes
    }, status: :ok
  end
end

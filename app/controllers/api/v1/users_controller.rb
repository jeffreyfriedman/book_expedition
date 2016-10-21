class Api::V1::UsersController < ApiController
  def index
    unless current_user.nil?
      user_info = current_user.attributes.slice("first_name", "last_name", "username", "email")
      user_destinations = current_user.destinations.order(created_at: :desc)
      user_books = current_user.books
    end
    render json: { user_info: user_info, destinations: user_destinations, books: user_books }, status: :ok
  end
end

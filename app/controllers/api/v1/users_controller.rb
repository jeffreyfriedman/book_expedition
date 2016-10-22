class Api::V1::UsersController < ApiController
  def index
    unless current_user.nil?
      user_info = current_user.attributes.slice("first_name", "last_name", "username", "email")
      user_destinations = current_user.destinations.order(created_at: :desc)
      user_books = current_user.books
      user_destination_notes = current_user.user_destinations
      # user_destination_notes = current_user.destinations.pluck(:id, :note) #to get the userdestination ID and the note for that userdestination
      # user_destination_notes = current_user.user_destinations.where.not(note: nil) # to get userdestinations where the user has written a note
      user_booknotes = current_user.user_books
    end
    render json: {
      user_info: user_info,
      destinations: user_destinations,
      destination_notes: user_destination_notes,
      books: user_books
    }, status: :ok
  end
end

class Api::V1::UsersController < ApiController
  def index
    unless current_user.nil?
      user_data = current_user.attributes.slice("first_name", "last_name", "username", "email")
      destinations = current_user.destinations.order(created_at: "desc")
    end
    render json: { userdata: user_data, destinations: destinations }, status: :ok
  end
end

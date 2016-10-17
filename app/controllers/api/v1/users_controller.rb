class Api::V1::UsersController < ApiController
  def index
    user_data = current_user.attributes.slice("first_name", "last_name", "username", "email")
    render json: { userdata: user_data }, status: :ok
  end
end

class Api::V1::UsersController < ApiController
  def index
    unless current_user.nil?
      user_data = current_user.attributes.slice("first_name", "last_name", "username", "email")
    end
    render json: { userdata: user_data }, status: :ok
  end
end

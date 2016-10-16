class Api::V1::UsersController < ApiController
  def index
    userdata = current_user

    render json: { userdata: userdata }, status: :ok
  end
end

class Api::V1::UserdestinationsController < ApiController
  def update
    user_destination = UserDestination.find_by(user: current_user, destination: params[:id])
    binding.pry
    user_destination.update_attribute(:note, ud_note_params[:note])
    render json: { note: user_destination.note }, status: :ok
  end

  def destroy
    # notes aren't actually destroyed, they are set to a value of nil to preserve the
    # UserDestination record
    user_destination = UserDestination.find_by(user: current_user, destination: params[:id])
    user_destination.update_attribute(:note, nil)
    render json: { note: user_destination.note }, status: :ok
  end

  private
  def ud_note_params
    params.require(:note).permit(:note)
  end
end

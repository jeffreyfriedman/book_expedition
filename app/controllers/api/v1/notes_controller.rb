class Api::V1::NotesController < ApiController
  def index
  end

  def create
      destination = Destination.find(params[:destination_id])
      note = Note.new(note_params)
      if note.save
        UserNote.create(user: current_user, note: note, destination: destination)
        render json: { note: note }, status: :created
      else
        render json: { errors: note.errors }, status: :unprocessable_entity
      end
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
  end

  private
  def book_params
    params.require(:note).permit(:body, :destination)
  end
end

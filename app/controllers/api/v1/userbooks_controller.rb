class Api::V1::UserbooksController < ApiController
  def create
    book = Book.find(params[:book_id])
    userbook = existing_userbook
    if userbook.nil?
      userbook = UserBook.create(user: current_user, book: book)
      render json: { book: book }, status: :ok
    else
      render :no_content, status: :unprocessable_entity
    end
  end

  def destroy
    userbook = UserBook.find_by(user_id: current_user.id, book_id: params[:id])
    userbook.destroy
  end

  private
  def existing_userbook
    UserBook.find_by(user_id: current_user.id, book_id: params[:id])
  end
end

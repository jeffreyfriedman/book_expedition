class Api::V1::BooksController < ApiController
  def create
    @book = existing_book
    if !@book.empty?
      UserBook.create(user: current_user, book: @book)
    else
      @book = Book.new(book_params)
      if @book.save
        UserBook.create(user: current_user, book: @book)
        @destination = Destination.find_by(id: params[:destination][:id])
        BookDestination.create(book: @book, destination: @destination)
        render json: { book: @book }, status: :created
      else
        render json: { errors: @book.errors }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    @user_book = UserBook.find_by(user: current_user, book: params[:id])
    @user_book.destroy
  end

  private
  def book_params
    params.require(:book).permit(:title, :author, :isbn, :url, :image)
  end

  def existing_book
    Book.search(params[:book])
  end
end

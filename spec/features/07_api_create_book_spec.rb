feature "create books through API" do
  describe Api::V1::BooksController, type: :controller do

    let!(:user) { FactoryGirl.create(:user) }
    let!(:book) { FactoryGirl.create(:book) }
    let!(:destination) { FactoryGirl.create(:destination) }
    describe 'POST /api/v1/books' do
      it 'creates a new Book if book does not already exist' do
        sign_in user
        post :create, params: {book: {title: book.title, authors: book.authors, isbn: book.isbn, url: book.url, image: book.image }, destination: { id: destination }}

        expect(response.status).to eq(201)
        res_body = JSON.parse(response.body)
        expect(res_body['book']['title']).to eq(book.title)
        expect(res_body['book']['authors']).to eq(book.authors)
        expect(res_body['book']['isbn']).to eq(book.isbn)
        expect(res_body['book']['url']).to eq(book.url)
        expect(res_body['book']['image']).to eq(book.image)
      end

      it 'creates a new UserBook record if a book is added by user' do
        sign_in user
        post :create, params: {book: {title: book.title, authors: book.authors, isbn: book.isbn, url: book.url, image: book.image }, destination: { id: destination }}

        user_book = UserBook.last
        expect(user_book.user_id).to eq(user.id)
        expect(user_book.book_id).to eq(Book.last.id)
      end
    end
  end
end

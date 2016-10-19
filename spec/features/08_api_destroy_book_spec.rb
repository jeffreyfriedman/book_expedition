feature "delete books through API" do
  describe Api::V1::BooksController, type: :controller do

    let!(:user_book) { FactoryGirl.create(:user_book) }

    describe 'DELETE /api/v1/destinations' do
      it 'deletes a UserBook through an API call' do
        user = user_book.user
        id = user_book.id
        sign_in user
        delete :destroy, params: { id: user_book }

        expect(response.status).to eq(204)

        expect { UserBook.find(id) }.to raise_exception(ActiveRecord::RecordNotFound)
      end
    end
  end
end

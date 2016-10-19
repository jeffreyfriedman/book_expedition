feature "delete destinations through API" do
  describe Api::V1::DestinationsController, type: :controller do

    let!(:user_destination) { FactoryGirl.create(:user_destination) }

    describe 'DELETE /api/v1/destinations' do
      it 'deletes a UserDestination through an API call' do
        user = user_destination.user
        id = user_destination.id
        sign_in user
        delete :destroy, params: { id: user_destination }

        expect(response.status).to eq(204)

        expect { UserDestination.find(id) }.to raise_exception(ActiveRecord::RecordNotFound)
      end
    end
  end
end

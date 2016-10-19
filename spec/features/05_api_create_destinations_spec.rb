feature "create destinations through API" do
  describe Api::V1::DestinationsController, type: :controller do

    let!(:user) { FactoryGirl.create(:user) }
    describe 'POST /api/v1/destinations' do
      country = 'japan'
      it 'creates a new Destination and UserDestination if a valid destination is provided' do
        sign_in user
        post :create, params: {destination: {country: country}}

        expect(response.status).to eq(201)
        res_body = JSON.parse(response.body)
        expect(res_body['destination']['country']).to eq(country.capitalize)
        expect(res_body['destination']['id']).not_to be(nil)
        expect(res_body['destination']['image']).not_to be(nil)

        user_destination = UserDestination.first
        expect(user_destination.user_id).to eq(user.id)
        expect(user_destination.destination_id).to eq(res_body['destination']['id'])
      end
    end
  end
end

feature "create notes through API" do
  describe Api::V1::NotesController, type: :controller do

    let!(:user) { FactoryGirl.create(:user) }
    let!(:destination) { FactoryGirl.create(:destination) }
    describe 'POST /api/v1/notes' do
      body = 'Testing notes API'
      it 'creates a new note valid parameters are provided' do
        sign_in user
        post :create, params: {note: {body: body, destination_id: destination.id}}

        expect(response.status).to eq(201)
        res_body = JSON.parse(response.body)
        expect(res_body['note']['body']).to eq(body)
        expect(res_body['note']['id']).not_to be(nil)
        expect(res_body['note']['destination_id']).not_to be(nil)
      end
    end
  end
end

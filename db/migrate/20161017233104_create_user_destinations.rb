class CreateUserDestinations < ActiveRecord::Migration[5.0]
  def change
    create_table :user_destinations do |t|
      t.belongs_to :user, null: false
      t.belongs_to :destination, null: false
      t.timestamps
    end
  end
end

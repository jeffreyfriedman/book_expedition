class CreateDestinations < ActiveRecord::Migration[5.0]
  def change
    create_table :destinations do |t|
      t.string :country, null: false
      t.string :city
      t.string :short_description
      t.string :image
      t.timestamps
    end
  end
end

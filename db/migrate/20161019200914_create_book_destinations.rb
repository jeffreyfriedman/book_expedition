class CreateBookDestinations < ActiveRecord::Migration[5.0]
  def change
    create_table :book_destinations do |t|
      t.belongs_to :book, null: false
      t.belongs_to :destination, null: false
      t.timestamps
    end
  end
end

class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author, null: false
      t.string :description
      t.string :isbn
      t.string :url
      t.string :image
      t.timestamps
    end
  end
end

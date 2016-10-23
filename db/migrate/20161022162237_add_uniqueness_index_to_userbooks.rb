class AddUniquenessIndexToUserbooks < ActiveRecord::Migration[5.0]
  def change
    add_index :user_books, [:user_id, :book_id], unique: true
  end
end

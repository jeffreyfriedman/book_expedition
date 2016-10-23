class AddUniquenessIndexToUserdestinations < ActiveRecord::Migration[5.0]
  def change
    add_index :user_destinations, [:user_id, :destination_id], unique: true
  end
end

class AddMoodToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :mood, :integer
  end
end

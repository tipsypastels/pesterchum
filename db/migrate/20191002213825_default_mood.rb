class DefaultMood < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :mood, 0
  end
end

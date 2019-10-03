class AddColorToUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :color
    add_column :users, :color, :string, default: '#000000'
  end
end

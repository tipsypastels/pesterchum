class AddChumhandleToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :chumhandle, :string
    add_column :users, :color, :string
  end
end

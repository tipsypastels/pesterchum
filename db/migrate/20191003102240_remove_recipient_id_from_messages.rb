class RemoveRecipientIdFromMessages < ActiveRecord::Migration[6.0]
  def change

    remove_column :messages, :recipient_id, :integer
  end
end

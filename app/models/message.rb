# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  content      :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  recipient_id :integer
#  sender_id    :integer
#

class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
end

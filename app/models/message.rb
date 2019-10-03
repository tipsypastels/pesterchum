# == Schema Information
#
# Table name: messages
#
#  id              :integer          not null, primary key
#  content         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  conversation_id :integer
#  sender_id       :integer
#

class Message < ApplicationRecord
  default_scope { order created_at: :asc }

  belongs_to :sender, 
    class_name: 'User',
    default: -> { Current.user }

  belongs_to :conversation

  validates :content, 
    presence: true

  acts_as_api

  api_accessible :public do |api|
    api.add :id
    api.add :content
    api.add :sender
    api.add :conversation_id
  end

  after_create_commit do 
    MessageBroadcastJob.perform_later(self)
  end
end

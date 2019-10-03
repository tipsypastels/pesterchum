# == Schema Information
#
# Table name: participants
#
#  id              :integer          not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  conversation_id :integer
#  user_id         :integer
#

class Participant < ApplicationRecord
  belongs_to :conversation
  belongs_to :user
end

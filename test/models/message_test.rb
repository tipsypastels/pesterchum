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

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

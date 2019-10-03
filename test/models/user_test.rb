# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  chumhandle             :string
#  color                  :string           default("#000000")
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  mood                   :integer          default("chummy")
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

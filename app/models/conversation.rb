# == Schema Information
#
# Table name: conversations
#
#  id         :integer          not null, primary key
#  mode       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Conversation < ApplicationRecord
  def self.memo_channel
    find_by!(mode: 'memo')
  end

  acts_as_api

  api_accessible :minimal do |api|
    api.add :id
    api.add :name
  end

  api_accessible :public do |api|
    api.add :id
    api.add :name
    api.add :messages
    api.add :users
  end

  has_many :messages
  has_many :participants
  has_many :users, through: :participants

  enum mode: {
    dm:   0,
    memo: 1,
  }

  validate :dm_is_between_two_people
  validate :only_one_memo_channel

  def name
    if memo?
      'Memo'
    else
      (users - [Current.user])[0].chumhandle
    end
  end

  private

  def dm_is_between_two_people
    if participants.size != 2 && mode == 'dm'
      errors.add(:mode, "dms must have two people")
    end
  end

  def only_one_memo_channel
    if Conversation.where(mode: 'memo').size > 1
      errors.add(:mode, "only one memo can exist")
    end
  end
end

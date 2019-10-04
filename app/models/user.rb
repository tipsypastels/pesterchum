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

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :chumhandle,
    presence: true,
    format: {
      with: /\A[a-z]+[A-Z][a-z]+\z/,
      message: 'must be formatted as in Homestuck - two words written in camelCase, eg.: ectoBiologist, arachnidsGrip'
    }

  validates :color,
    presence: true,
    format: {
      with: /\A#[0-9a-f]{6}\z/,
      message: 'must be a hex color code'
    }
  
  acts_as_api
  
  api_accessible :public do |api|
    api.add :id
    api.add :color
    api.add :chumhandle
    api.add :short_chumhandle
    api.add :mood
    api.add :conversations, template: :minimal
  end
  
  has_many :messages,
    foreign_key: :sender_id,
    inverse_of: :sender
  
  has_many :participations,
    class_name: 'Participant'

  has_many :conversations,
    through: :participations

  enum mood: {
    chummy:    0,
    palsy:     1,
    chipper:   2,
    bully:     3,
    peppy:     4,
    rancorous: 5,
  }

  after_create :add_to_memo
  before_validation :add_hash_to_color

  def short_chumhandle
    (chumhandle[0] + chumhandle[/[A-Z]/]).upcase
  end

  private

  def add_to_memo
    Participant.create! \
      user_id: id, 
      conversation_id: Conversation.memo_channel.id
  end

  def add_hash_to_color
    unless color.start_with?('#')
      self.color = "##{color}"
    end
  end
end

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  chumhandle             :string
#  color                  :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  mood                   :integer
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
      message: 'Chumhandles must be formatted as in Homestuck - two words written in camelCase, eg.: ectoBiologist, arachnidsGrip'
    }
  
  def short_chumhandle
    (chumhandle[0] + chumhandle[/[A-Z]/]).upcase
  end

  has_many :messages,
    foreign_key: :sender_id,
    inverse_of: :sender

  enum mood: {
    chummy:    0,
    palsy:     1,
    chipper:   2,
    bully:     3,
    peppy:     4,
    rancorous: 5,
  }
end

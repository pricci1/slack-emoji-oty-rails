class Poll < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :emojis, dependent: :destroy

  validates :owner_id, presence: true
  validates :votes_per_participant, presence: true, numericality: { only_integer: true }
end

# == Schema Information
#
# Table name: polls
#
#  id                    :integer          not null, primary key
#  owner_id              :string
#  votes_per_participant :integer
#  team_id               :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

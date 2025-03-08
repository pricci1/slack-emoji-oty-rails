class Emoji < ApplicationRecord
  belongs_to :poll
  has_many :votes, dependent: :destroy

  validates :name, presence: true
  validates :image, presence: true
end

# == Schema Information
#
# Table name: emojis
#
#  id         :integer          not null, primary key
#  name       :string
#  image      :string
#  poll_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_emojis_on_poll_id  (poll_id)
#

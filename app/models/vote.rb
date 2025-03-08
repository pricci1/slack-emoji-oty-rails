class Vote < ApplicationRecord
  belongs_to :poll
  belongs_to :emoji

  validates :user_id, presence: true
end

# == Schema Information
#
# Table name: votes
#
#  id         :integer          not null, primary key
#  user_id    :string
#  poll_id    :integer          not null
#  emoji_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_votes_on_emoji_id  (emoji_id)
#  index_votes_on_poll_id   (poll_id)
#

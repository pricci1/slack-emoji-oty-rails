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

require "test_helper"

class EmojiTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

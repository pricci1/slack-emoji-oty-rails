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

require "test_helper"

class PollTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

require "test_helper"

class PollsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @poll = polls(:one)
  end

  test "should get index" do
    get _polls_url
    assert_response :success
  end

  test "should get new" do
    get new__poll_url
    assert_response :success
  end

  test "should create poll" do
    assert_difference("Poll.count") do
      post _polls_url, params: { poll: {} }
    end

    assert_redirected_to _poll_url(Poll.last)
  end

  test "should show poll" do
    get _poll_url(@poll)
    assert_response :success
  end

  test "should get edit" do
    get edit__poll_url(@poll)
    assert_response :success
  end

  test "should update poll" do
    patch _poll_url(@poll), params: { poll: {} }
    assert_redirected_to _poll_url(@poll)
  end

  test "should destroy poll" do
    assert_difference("Poll.count", -1) do
      delete _poll_url(@poll)
    end

    assert_redirected_to _polls_url
  end
end

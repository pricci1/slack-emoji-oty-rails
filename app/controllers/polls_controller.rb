class PollsController < ApplicationController
  before_action :set_poll, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /polls
  def index
    @polls = Poll.all
    render inertia: "Poll/Index", props: {
      polls: @polls.map do |poll|
        serialize_poll(poll)
      end
    }
  end

  # GET /polls/1
  def show
    render inertia: "Poll/Show", props: {
      poll: serialize_poll(@poll)
    }
  end

  # GET /polls/new
  def new
    @poll = Poll.new
    render inertia: "Poll/New", props: {
      poll: serialize_poll(@poll)
    }
  end

  # GET /polls/1/edit
  def edit
    render inertia: "Poll/Edit", props: {
      poll: serialize_poll(@poll)
    }
  end

  # POST /polls
  def create
    @poll = Poll.new(poll_params)

    if @poll.save
      # redirect_to [, @poll], notice: "Poll was successfully created."
    else
      redirect_to new_poll_url, inertia: { errors: @poll.errors }
    end
  end

  # PATCH/PUT /polls/1
  def update
    if @poll.update(poll_params)
      # redirect_to [, @poll], notice: "Poll was successfully updated."
    else
      redirect_to edit_poll_url(@poll), inertia: { errors: @poll.errors }
    end
  end

  # DELETE /polls/1
  def destroy
    @poll.destroy!
    redirect_to _polls_url, notice: "Poll was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_poll
      @poll = Poll.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def poll_params
      params.fetch(:poll, {})
    end

    def serialize_poll(poll)
      poll.as_json(only: [
        :id
      ])
    end
end

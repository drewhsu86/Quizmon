class CompletedsController < ApplicationController
  before_action :authorize_request, only: [:create, :update, :destroy]
  before_action :set_completed, only: [:show, :update, :destroy]

  # GET /completeds
  def index
    @completeds = Completed.all

    render json: @completeds
  end

  # GET /completeds/1
  def show
    render json: @completed
  end

  # POST /completeds
  def create
    @completed = Completed.new(completed_params)
    @completed.user = @current_user

    if @completed.save
      render json: @completed, status: :created, location: @completed
    else
      render json: @completed.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /completeds/1
  def update
    if @completed.update(completed_params)
      render json: @completed
    else
      render json: @completed.errors, status: :unprocessable_entity
    end
  end

  # DELETE /completeds/1
  def destroy
    @completed.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_completed
      @completed = Completed.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def completed_params
      params.require(:completed).permit(:user_id, :question_id)
    end
end

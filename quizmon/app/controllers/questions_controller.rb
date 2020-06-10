class QuestionsController < ApplicationController
  before_action :authorize_request, only: [:create, :update, :destroy]
  before_action :set_question, only: [:update, :destroy]

  # GET /questions
  def index
    @questions = Question.all

    render json: @questions
  end

  # GET /questions/1
  def show
    @question = Question.find(params[:id])

    render json: @question, include: :topic
  end

  # POST /questions
  def create
    # there is a finite number of topics and we need to grab it using its id 
    # the topics would've been called to a dragdown list on frontend with 
    # a route to get all topics so the frontend has the ids 

    @question = Question.new(question_params)
    @question.user = @current_user

    if @question.save
      render json: @question, status: :created
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questions/1
  def update
    # there is a finite number of topics and we need to grab it using its id 
    # the topics would've been called to a dragdown list on frontend with 
    # a route to get all topics so the frontend has the ids 

    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1
  def destroy
    @question.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_question
    @question = @current_user.questions.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def question_params
    params.require(:question).permit(:content, :topic, :correct_answer, :answer_a, :answer_b, :answer_c, :answer_d, :private, :topic_id)
  end
end

class QuestionsController < ApplicationController
  before_action :authorize_request, only: [:create, :update, :destroy]
  before_action :set_question, only: [:update, :destroy]

  # GET /questions
  def index
    # topic_id is passed as a query on the endpoint 
    # we filter by topic_id 
    # if my_own is passed as a param 
    # we filter questions where id is user_id 
    @topic_id = params[:topic]
    @my_own = params[:my_own]
    
    if @topic_id == nil
      @questions = Question.all
    else 
      @questions = Question.where(topic_id: @topic_id)
    end

    if @my_own && @my_own.downcase == 'true'
      # filter to keep questions where user id is that of the user with token 
      # we authorize request here so it stays in the if statement 
      # authorize request should give us an @current_user  
      @current_user = authorize_request 
      puts 'Current User'
      puts @current_user
      @questions.filter do |question|
        
        puts 'Question:'
        puts question 

        question[:user_id] == @current_user[:id] 
      end
    end

    render json: @questions
  end

  # GET /questions/1
  def show
    @question = Question.find(params[:id])

    render json: @question, include: [ {topic: {only: [:id, :name]}}, {comments: {only: [:id, :content]}} ] 
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
    params.require(:question).permit(:content, :topic, :correct_answer, :answer_a, :answer_b, :answer_c, :answer_d, :private, :user_id, :topic_id)
  end
end

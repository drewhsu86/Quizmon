# frozen_string_literal: true

class AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login

  # POST /auth/login
  def login
    @user = User.find_by_username(login_params[:username])
    if @user.authenticate(login_params[:password]) # authenticate method provided by Bcrypt and 'has_secure_password'
      @token = encode({ user_id: @user.id })
      @user_and_id = {
        username: @user[:username],
        id: @user[:id]
      }
      render json: { user: @user_and_id, token: @token }, status: :ok
    else
      render json: { errors: 'unauthorized' }, status: :unauthorized
    end
  end

  # GET /auth/verify
  def verify
    render json: @current_user, status: :ok
  end

  private

  def login_params
    params.require(:user).permit(:username, :password)
  end
end

class SessionsController < ApplicationController
  before_action :redirect_if_authenticated, only: [:new, :create]

  def new
    render inertia: 'Sessions/New'
  end

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: 'Signed in successfully'
    else
      redirect_to new_session_path, alert: 'Invalid email or password'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: 'Signed out successfully'
  end

  private

  def redirect_if_authenticated
    redirect_to root_path if Current.user
  end
end

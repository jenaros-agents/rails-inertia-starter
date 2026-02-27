class RegistrationsController < ApplicationController
  before_action :redirect_if_authenticated, only: [:new, :create]

  def new
    render inertia: 'Registrations/New'
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: 'Account created successfully'
    else
      render inertia: 'Registrations/New', props: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def redirect_if_authenticated
    redirect_to root_path if Current.user
  end
end

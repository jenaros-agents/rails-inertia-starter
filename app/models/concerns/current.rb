module Current
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
    helper_method :current_user
  end

  private

  def set_current_user
    Current.user = User.find_by(id: session[:user_id]) if session[:user_id]
  end
end

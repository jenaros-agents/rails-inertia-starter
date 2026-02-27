class ApplicationController < ActionController::Base
  include InertiaRails::Controller
  include Current

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_inertia_shared_props

  private

  def set_inertia_shared_props
    inertia.share(auth: {
      user: Current.user ? {
        id: Current.user.id,
        email: Current.user.email
      } : nil
    })
  end
end

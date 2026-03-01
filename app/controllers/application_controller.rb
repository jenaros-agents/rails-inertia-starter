class ApplicationController < ActionController::Base
  include InertiaRails::Controller
  include CurrentUser

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Share auth data with all Inertia pages
  inertia_share do
    {
      auth: {
        user: Current.user ? {
          id: Current.user.id,
          email: Current.user.email
        } : nil
      }
    }
  end
end

class ApplicationController < ActionController::Base
  before_action do
    Current.user = current_user
  end

  before_action :authenticate_user!,
    unless: :devise_controller?

  before_action :allow_chumhandle_in_registration,
    if: :devise_controller?

  private

  def allow_chumhandle_in_registration
    devise_parameter_sanitizer
      .permit(:sign_up, keys: %i|chumhandle|)
  end
end
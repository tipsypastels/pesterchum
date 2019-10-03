class UsersController < ApplicationController
  def index
  end

  def change
    user = Current.user

    if user.update(change_params)
      render json: {
        success: true,
        user: user.as_api_response(:public)
      }
    else
      render json: {
        success: false,
        error: user.errors.full_messages.first,
      }
    end
  end

  private

  def change_params
    params.require(:user).permit(:chumhandle, :mood, :color)
  end
end
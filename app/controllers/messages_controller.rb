class MessagesController < ApplicationController
  def create
    render_for_api :public,
      json: Message.create!(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:content, :conversation_id)
  end
end
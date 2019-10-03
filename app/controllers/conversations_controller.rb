class ConversationsController < ApplicationController
  def show
    render_for_api :public, 
      json: Conversation.find(params[:id])
  end
end
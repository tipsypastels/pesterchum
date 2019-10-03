class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast(
      "conversation_channel_#{message.conversation_id}",
      type: :message,
      message: message.as_api_response(:public),
    )
  end
end

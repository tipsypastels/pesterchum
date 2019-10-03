import React, { useState, useEffect, useContext, useRef } from 'react';
import Conversation from '../models/conversation';
import Message from '../models/message';
import axios from 'axios';
import MessageLog from './MessageLog';
import { AppContext } from './ChatClient';
import Cable from '../channels/consumer'

type CableData =
  | { type: 'message', message: Message };

interface IProps {
  conversationId: number;
}

export default function Channel(props: IProps) {
  const [{ authToken }] = useContext(AppContext);

  const [conversation, setConversation] 
    = useState<Conversation>(null);

  const [reply, setReply] = useState('');

  // get the conversation
  useEffect(() => {
    if (conversation) {
      return;
    }
    
    axios({
      method: 'get',
      url: `/conversations/${props.conversationId}`,
    }).then(({ data }) => {
      setConversation(data.conversation);
    })
  }, [conversation, props.conversationId])

  // get new messages via cable
  useEffect(() => {
    if (!conversation) {
      return;
    }

    const subscription = Cable.subscriptions.create(
      {
        channel: 'ConversationChannel',
        conversation_id: props.conversationId,
      },
      {
        received(data: CableData) {
          switch(data.type) {
            case 'message': {
              const newConvo = { ...conversation };
              newConvo.messages.push(data.message);
              setConversation(newConvo);
              setReply('');
            };
          }
        },
      },
    );

    return subscription.unsubscribe;
  }, [props.conversationId, !!conversation])

  const messagesNode = useRef<HTMLDivElement>();

  // scroll to the bottom of the conversation
  useEffect(() => {
    if (conversation) {
      // idk why ts doesnt like this it works fine
      (messagesNode.current.lastChild as Element)
        .scrollIntoView();
    }
  }, [conversation])

  if (!conversation) {
    return null;
  }

  // doesn't need to push the reply because the cable gets it
  // so doesnt need to await or anything
  function submitReply(e: React.FormEvent) {
    e.preventDefault();

    axios({
      method: 'post',
      url: '/messages',
      data: {
        message: {
          content: reply,
          conversation_id: props.conversationId,
        },
        authenticity_token: authToken,
      },
    });
  }

  return (
    <div className="Channel">
      <div 
        className="Channel__messages"
        ref={messagesNode}
      >
        {conversation.messages.map(
          m => <MessageLog {...m} key={m.id} />
        )}
      </div>

      <form 
        className="Channel__reply"
        onSubmit={submitReply}
      >
        <input 
          type="text"
          value={reply}
          onChange={e => setReply(e.target.value)}
          autoFocus
        />

        <input
          type="submit"
          value="SEND"
        />
      </form>
    </div>
  );
}

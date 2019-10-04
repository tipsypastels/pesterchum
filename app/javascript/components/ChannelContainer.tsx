import React, { useState, useContext } from 'react';
import Channel from './Channel';
import { AppContext } from './ChatClient';

export default function ChannelContainer() {
  const [{ user }] = useContext(AppContext);
  const [tab, setTab] = useState(
    user.conversations[0].id
  );

  return (
    <div className="ChannelContainer">
      <div className="ChannelContainer__tabs">
        {user.conversations.map(convo => (
          <button
            key={convo.id}
            onClick={() => setTab(convo.id)}
          >
            {convo.name}
          </button>
        ))}
      </div>

      <div className="ChannelContainer__channel">
        <Channel conversationId={tab} />
      </div>
    </div>
  )
}

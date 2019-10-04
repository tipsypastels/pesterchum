import React from 'react'
import Message from '../models/message'

export default function MessageLog(props: Message) {
  return (
    <div className="MessageLog">
      <strong style={{ color: props.sender.color }}>{props.sender.short_chumhandle}:</strong> {props.content}
    </div>
  );
}
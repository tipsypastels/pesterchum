import React, { useContext, useState } from 'react';
import { AppContext } from './ChatClient';
import { MOODS } from '../models/mood';
import axios from 'axios';

export default function MoodChanger() {
  const [appState, appDispatch] = useContext(AppContext);
  const [mood, setMood] = useState(appState.user.mood);

  async function changeTo(newMood) {
    if (mood === newMood) {
      return;
    }

    setMood(newMood);

    try {
      const { data } = await axios({
        method: 'patch',
        url: '/users/change',
        data: {
          user: { mood: newMood },
          authenticity_token: appState.authToken,
        }
      });

      if (data.success) {
        appDispatch({ type: 'SET_USER', user: data.user });
      } else {
        console.error(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className="MoodChanger">
      <strong>
        MY MOOD:
      </strong>

      <div className="moods__container">
        {Object.keys(MOODS).map(name => (
          <div 
            key={name} 
            className={`box-inverse mood mood-${name}`}
            onClick={async () => {
              await changeTo(name);
            }}
          >
            {name === mood
              ? `- ${name.toUpperCase()} -`
              : name.toUpperCase()
            }
          </div>
        ))}
      </div>
    </section>
  );
}

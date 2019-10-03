import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './ChatClient';

export default function ColorChanger() {
  const [appState, appDispatch] = useContext(AppContext);

  const [color, setColor] = useState(appState.user.color);
  const [error, setError] = useState<string>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (color === appState.user.color) {
      setError(null);
      return;
    }

    try {
      const { data } = await axios({
        method: 'patch',
        url: '/users/change',
        data: {
          user: { color },
          authenticity_token: appState.authToken,
        },
      });

      if (data.success) {
        // to add the # if needed
        setColor(data.user.color);
        appDispatch({ type: 'SET_USER', user: data.user });
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className="ColorChanger">
      <strong>
        MY COLOR:
      </strong>

      <form onSubmit={submit}>
        <input
          type="text"
          value={color}
          onChange={e => {
            setColor(e.target.value);
          }}
        />

        <input type="submit" value="CHANGE" />

        {error && <div className="error">{error}</div>}
      </form>
    </section>
  );
}

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './ChatClient';

export default function ChumhandleChanger() {
  const [appState, appDispatch] = useContext(AppContext);

  const [chumhandle, setChumhandle] = useState(appState.user.chumhandle);
  const [error, setError] = useState<string>(null);


  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (chumhandle === appState.user.chumhandle) {
      setError(null);
      return;
    }

    try {
      const { data } = await axios({
        method: 'patch',
        url: '/users/change',
        data: {
          user: { chumhandle },
          authenticity_token: appState.authToken,
        },
      });

      if (data.success) {
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
    <section className="ChumhandleChanger">
      <strong>
        MY CHUMHANDLE:
      </strong>
      
      <form onSubmit={submit}>
        <input
          type="text"
          value={chumhandle}
          onChange={e => {
            setChumhandle(e.target.value);
          }}
          />

        <input type="submit" value="CHANGE" />

        {error && <div className="error">{error}</div>}
      </form>
    </section>
  );
}

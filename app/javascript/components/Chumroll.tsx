import React, { useState } from 'react';
import User from '../models/user';

export default function Chumroll() {
  let [chums, setChums] = useState<User[]>([]);

  let chumbits = chums.length === 0
    ? (
      <div>No chums are online :(</div>
    ) : (
      chums.map(chum => (
        <div key={chum.id} className="chum">
          {chum.chumhandle}
        </div>
      ))
    );

  return (
    <section className="Chumroll">
      <strong>
        CHUMROLL:
      </strong>

      <div className="box">
        {chumbits}
      </div>
    </section>
  )
}

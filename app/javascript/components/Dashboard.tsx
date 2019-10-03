import React from 'react'
import ChumhandleChanger from './ChumhandleChanger'
import MoodChanger from './MoodChanger';
import Chumroll from './Chumroll';
import ColorChanger from './ColorChanger';

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <h2 className="white">
        PESTERCHUM
      </h2>

      <section className="box">
        CHAT CLIENT
      </section>

      <Chumroll />
      <ChumhandleChanger />
      <ColorChanger />
      <MoodChanger />
    </div>
  );
}

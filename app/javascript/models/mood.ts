export const MOODS = {
  chummy: 0,
  palsy: 1,
  chipper: 2,
  bully: 3,
  peppy: 4,
  rancorous: 5,
};

type Mood = keyof typeof MOODS;
export default Mood;
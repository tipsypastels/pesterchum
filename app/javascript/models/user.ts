import Mood from "./mood";

export default interface User {
  id: number;
  color: string;
  chumhandle: string;
  short_chumhandle: string;
  mood: Mood;
}
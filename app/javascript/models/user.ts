import Mood from "./mood";
import Conversation from "./conversation";

export default interface User {
  id: number;
  color: string;
  chumhandle: string;
  short_chumhandle: string;
  mood: Mood;
  conversations: Conversation[];
}
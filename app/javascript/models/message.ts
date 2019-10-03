import User from "./user";

export default interface Message {
  id: number;
  content: string;
  sender: User;
  conversation_id: number;
}
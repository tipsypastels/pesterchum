import User from "./user";
import Message from "./message";

export default interface Conversation {
  id: number;
  users: User[];
  messages: Message[]; 
}
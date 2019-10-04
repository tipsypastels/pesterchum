import User from "./user";
import Message from "./message";

export default interface Conversation {
  id: number;
  name: string;
  users: User[];
  messages: Message[]; 
}
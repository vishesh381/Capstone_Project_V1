export interface Message {
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: number; // Make sure the timestamp is a required field
  }
  
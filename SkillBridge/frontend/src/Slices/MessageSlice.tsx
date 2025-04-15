import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}

interface MessageState {
  chatHistory: Message[];
  latestMessage: Message | null;
}

const initialState: MessageState = {
  chatHistory: [],
  latestMessage: null,
};

// Local storage helpers
const LOCAL_STORAGE_KEY = 'chatMessages';

const saveMessageToLocalStorage = (message: Message) => {
  const key = getChatKey(message.senderId, message.receiverId);
  const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
  const updated = existing[key] ? [...existing[key], message] : [message];
  existing[key] = updated;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
};

const getChatKey = (userA: string, userB: string): string => {
  return [userA, userB].sort().join('_');
};

const loadMessagesFromLocalStorage = (senderId: string, receiverId: string): Message[] => {
  const key = getChatKey(senderId, receiverId);
  const allMessages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
  return allMessages[key] || [];
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      state.chatHistory.push(message);
      state.latestMessage = message;
      saveMessageToLocalStorage(message);
    },
    loadMessages: (
      state,
      action: PayloadAction<{ senderId: string; receiverId: string }>
    ) => {
      const { senderId, receiverId } = action.payload;
      state.chatHistory = loadMessagesFromLocalStorage(senderId, receiverId);
    },
    clearLatestMessage: (state) => {
      state.latestMessage = null;
    },
  },
});

export const { addMessage, loadMessages, clearLatestMessage } = messageSlice.actions;
export default messageSlice.reducer;

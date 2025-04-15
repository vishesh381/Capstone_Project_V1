import axiosInstance from "../Interceptor/AxiosInterceptor";

// Define message type
interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}

// Function to send a message
const sendMessage = async (message: Message) => {
  try {
    const response = await axiosInstance.post("/messages/send", message);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Function to get chat history
const getChatHistory = async (senderId: string, receiverId: string) => {
  try {
    const response = await axiosInstance.get(`/messages/chat/${senderId}/${receiverId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};
// New function to get messages for the logged-in receiver
const getReceiverChat = async (receiverId: string) => {
  try {
    const response = await axiosInstance.get(`/messages/receiverChat/${receiverId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages for receiver:", error);
    throw error;
  }
};

export { sendMessage, getChatHistory, getReceiverChat };

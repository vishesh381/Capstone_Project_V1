import { Box, Button, Input, ScrollArea, Text } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { sendMessage, getChatHistory } from "../../Services/MessageService";
import { Message } from "./MessageType";

interface ChatComponentProps {
  senderId: string;
  receiverId: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChatHistory(senderId, receiverId);
        setMessages(data);
      } catch (error) {
        console.error("Failed to load chat history");
      }
    };

    if (senderId && receiverId) {
      fetchMessages();
    }

    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [senderId, receiverId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      senderId,
      receiverId,
      content: newMessage,
      timestamp: Date.now(),
    };

    try {
      const sent = await sendMessage(message);
      setMessages((prev) => [...prev, sent]);
      setNewMessage("");
    } catch (error) {
      console.error("Message not sent");
    }
  };

  return (
    <Box
      maw={600}
      mx="auto"
      bg={theme.colors.mineShaft?.[9] || "dark"}
      p="md"
      style={{ borderRadius: 12, boxShadow: "0 0 12px rgba(0,0,0,0.5)" }}
    >
      <ScrollArea h={400} mb="md">
  {messages.length === 0 ? (
    <Text style={{ textAlign: "center" }} color="dimmed">
      No messages yet. Start the conversation!
    </Text>
  ) : (
    messages.map((msg, idx) => (
      <Box
        key={idx}
        style={{
          display: "flex",
          justifyContent: msg.senderId === senderId ? "flex-end" : "flex-start",
          marginBottom: 12,
        }}
      >
        <Box
          bg={
            msg.senderId === senderId
              ? theme.colors.brightSun?.[5]
              : theme.colors.mineShaft?.[6]
          }
          p="sm"
          style={{
            borderRadius: 8,
            maxWidth: "70%",
            color: msg.senderId === senderId ? "black" : "white",
          }}
        >
          {msg.content}
          <Text size="xs" color="dimmed" mt={4}>
            {new Date(msg.timestamp).toLocaleTimeString()}
          </Text>
        </Box>
      </Box>
    ))
  )}
</ScrollArea>

      <Box style={{ display: "flex", gap: 8 }}>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          placeholder="Type your message..."
          style={{ flex: 1 }}
        />
        <Button color="brightSun" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatComponent;

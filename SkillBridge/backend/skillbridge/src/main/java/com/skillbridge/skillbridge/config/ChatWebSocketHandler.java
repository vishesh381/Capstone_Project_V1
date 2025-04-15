package com.skillbridge.skillbridge.config;

import org.springframework.web.socket.WebSocketHandler;
import com.skillbridge.skillbridge.service.MessageService;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.skillbridge.skillbridge.dto.MessageDTO;

public class ChatWebSocketHandler extends TextWebSocketHandler {
@Autowired
    private MessageService messageService;
    @Override
public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    // Extract relevant information (e.g., sender and receiver IDs) from the message
    // Save the message to the database
    MessageDTO messageDTO = new MessageDTO(); // Parse the message payload
    messageDTO.setSenderId("senderId");
    messageDTO.setReceiverId("receiverId");
    messageDTO.setContent(message.getPayload());
    messageDTO.setTimestamp(System.currentTimeMillis());

    // Save message using the service
    messageService.saveMessage(messageDTO);

    // Send the message to the correct user (you can improve the logic here)
    session.sendMessage(new TextMessage("Message Sent: " + message.getPayload()));
}


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("New WebSocket connection established: " + session.getId());
    }
}
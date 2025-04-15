package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.dto.MessageDTO;
import com.skillbridge.skillbridge.entity.Message;
import com.skillbridge.skillbridge.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public MessageDTO saveMessage(MessageDTO messageDTO) {
        Message message = messageDTO.toEntity();
        message.setTimestamp(System.currentTimeMillis()); // Set current timestamp
        return messageRepository.save(message).toDTO();
    }

    public List<MessageDTO> getChatHistory(String senderId, String receiverId) {
        List<Message> messages = messageRepository.findBySenderIdAndReceiverIdOrSenderIdAndReceiverId(
            senderId, receiverId, receiverId, senderId
        );
        
        return messages.stream()
            .sorted((m1, m2) -> Long.compare(m1.getTimestamp(), m2.getTimestamp())) // sort by timestamp
            .map(Message::toDTO)
            .collect(Collectors.toList());
    }
    public List<MessageDTO> getMessagesForReceiver(String receiverId) {
        return messageRepository.findByReceiverId(receiverId);
    }
    
}

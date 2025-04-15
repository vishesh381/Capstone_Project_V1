package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.dto.MessageDTO;
import com.skillbridge.skillbridge.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    List<Message> findBySenderIdAndReceiverIdOrSenderIdAndReceiverId(
    String senderId1, String receiverId1, String senderId2, String receiverId2
);
    List<MessageDTO> findByReceiverId(String receiverId);
}

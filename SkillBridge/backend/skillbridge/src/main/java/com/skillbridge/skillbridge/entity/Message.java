package com.skillbridge.skillbridge.entity;

import com.skillbridge.skillbridge.dto.MessageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private String content;
    private Long timestamp;

    public MessageDTO toDTO() {
        return new MessageDTO(this.id, this.senderId, this.receiverId, this.content, this.timestamp);
    }
}

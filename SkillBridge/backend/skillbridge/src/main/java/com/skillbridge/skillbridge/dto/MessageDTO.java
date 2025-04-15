package com.skillbridge.skillbridge.dto;

import com.skillbridge.skillbridge.entity.Message;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private String id;

    @NotBlank(message = "Sender ID cannot be empty")
    private String senderId;

    @NotBlank(message = "Receiver ID cannot be empty")
    private String receiverId;

    @NotBlank(message = "Message content cannot be empty")
    private String content;

    private Long timestamp;

    public Message toEntity() {
        return new Message(this.id, this.senderId, this.receiverId, this.content, this.timestamp);
    }
}

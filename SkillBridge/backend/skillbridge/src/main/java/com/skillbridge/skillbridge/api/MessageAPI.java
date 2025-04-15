package com.skillbridge.skillbridge.api;

import com.skillbridge.skillbridge.dto.MessageDTO;
import com.skillbridge.skillbridge.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/messages")
public class MessageAPI {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<MessageDTO> sendMessage(@RequestBody MessageDTO messageDTO) {
        return new ResponseEntity<>(messageService.saveMessage(messageDTO), HttpStatus.CREATED);
    }

    @GetMapping("/chat/{senderId}/{receiverId}")
    public ResponseEntity<List<MessageDTO>> getChatHistory(@PathVariable String senderId, @PathVariable String receiverId) {
        return new ResponseEntity<>(messageService.getChatHistory(senderId, receiverId), HttpStatus.OK);
    }
    // New method to get all messages sent to the receiver
    @GetMapping("/receiverChat/{receiverId}")
    public ResponseEntity<List<MessageDTO>> getReceiverChat(@PathVariable String receiverId) {
        return new ResponseEntity<>(messageService.getMessagesForReceiver(receiverId), HttpStatus.OK);
    }
}

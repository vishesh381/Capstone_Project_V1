package com.skillbridge.skillbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO {
    private String message;
    private Object data; // This will hold any additional data like the file URL

    // Constructor to set only the message
    public ResponseDTO(String message) {
        this.message = message;
    }

    public void setData(Object data) {
        this.data = data;
    }
}

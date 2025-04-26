package com.skillbridge.skillbridge.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.skillbridge.skillbridge.dto.AccountType;
import com.skillbridge.skillbridge.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	private Long id;
	private String name;
	@Indexed(unique = true)
	private String email;
	private String password;
	private AccountType accountType;
	private Long profileId;
	// Getter method for id
    public Long getId() {
        return this.id;
    }
	public UserDTO toDTO() {
		return new UserDTO(this.id, this.name, this.email, this.password, this.accountType, this.profileId);
	}

}
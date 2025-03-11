package com.skillbridge.skillbridge.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillbridge.skillbridge.entity.User;

public interface UserRepository extends MongoRepository<User, Long>{
	public Optional<User>findByEmail(String email);
}

package com.skillbridge.skillbridge.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillbridge.skillbridge.entity.Profile;

public interface ProfileRepository extends MongoRepository<Profile, Long> {
	
}

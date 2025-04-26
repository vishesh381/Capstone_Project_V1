package com.skillbridge.skillbridge.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillbridge.skillbridge.entity.Profile;

public interface ProfileRepository extends MongoRepository<Profile, Long> {
	Optional<Profile> findById(Long userId);
}

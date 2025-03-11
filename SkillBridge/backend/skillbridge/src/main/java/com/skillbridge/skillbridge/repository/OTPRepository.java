package com.skillbridge.skillbridge.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillbridge.skillbridge.entity.OTP;

public interface OTPRepository extends MongoRepository<OTP, String> {
	    List<OTP> findByCreationTimeBefore(LocalDateTime expiryTime);
}

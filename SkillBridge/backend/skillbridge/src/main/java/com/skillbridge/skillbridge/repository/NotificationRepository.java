package com.skillbridge.skillbridge.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillbridge.skillbridge.dto.NotificationStatus;
import com.skillbridge.skillbridge.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, Long> {
	public List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);
}

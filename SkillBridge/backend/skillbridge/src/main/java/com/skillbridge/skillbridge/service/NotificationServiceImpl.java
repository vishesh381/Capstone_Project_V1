package com.skillbridge.skillbridge.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.dto.NotificationDTO;
import com.skillbridge.skillbridge.dto.NotificationStatus;
import com.skillbridge.skillbridge.entity.Notification;
import com.skillbridge.skillbridge.exception.JobPortalException;
import com.skillbridge.skillbridge.repository.NotificationRepository;
import com.skillbridge.skillbridge.utility.Utilities;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService{
	@Autowired
	private NotificationRepository notificationRepository;

	@Override
	public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
		notificationDTO.setId(Utilities.getNextSequenceId("notification"));
		notificationDTO.setStatus(NotificationStatus.UNREAD);
		notificationDTO.setTimestamp(LocalDateTime.now());
		notificationRepository.save(notificationDTO.toEntity());
	}

	@Override
	public List<Notification> getUnreadNotifications(Long userId) {
		return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
	}

	@Override
	public void readNotification(Long id) throws JobPortalException {
		Notification noti=notificationRepository.findById(id).orElseThrow(()->new JobPortalException("No Notitication found"));
		noti.setStatus(NotificationStatus.READ);
		notificationRepository.save(noti);
		
	}
}

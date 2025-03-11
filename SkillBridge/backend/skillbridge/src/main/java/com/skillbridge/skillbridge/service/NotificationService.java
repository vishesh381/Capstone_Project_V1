package com.skillbridge.skillbridge.service;

import java.util.List;

import com.skillbridge.skillbridge.dto.NotificationDTO;
import com.skillbridge.skillbridge.entity.Notification;
import com.skillbridge.skillbridge.exception.JobPortalException;

public interface NotificationService {
	public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;
	public List<Notification> getUnreadNotifications(Long userId);
	public void readNotification(Long id) throws JobPortalException;
}

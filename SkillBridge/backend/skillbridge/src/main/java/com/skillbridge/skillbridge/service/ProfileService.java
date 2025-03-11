package com.skillbridge.skillbridge.service;

import java.util.List;

import com.skillbridge.skillbridge.dto.ProfileDTO;
import com.skillbridge.skillbridge.dto.UserDTO;
import com.skillbridge.skillbridge.exception.JobPortalException;

public interface ProfileService {
	public Long createProfile(UserDTO userDTO) throws JobPortalException;

	public ProfileDTO getProfile(Long id) throws JobPortalException;

	public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException;

	public List<ProfileDTO> getAllProfiles() throws JobPortalException;
}

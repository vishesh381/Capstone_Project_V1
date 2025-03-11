package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.dto.LoginDTO;
import com.skillbridge.skillbridge.dto.ResponseDTO;
import com.skillbridge.skillbridge.dto.UserDTO;
import com.skillbridge.skillbridge.exception.JobPortalException;




public interface UserService {

	public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;
	public UserDTO getUserByEmail(String email)throws JobPortalException;

	public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;

	public Boolean sendOTP(String email) throws  Exception;

	public Boolean verifyOtp( String email, String otp) throws JobPortalException;

	public ResponseDTO changePassword( LoginDTO loginDTO) throws JobPortalException;
	
}

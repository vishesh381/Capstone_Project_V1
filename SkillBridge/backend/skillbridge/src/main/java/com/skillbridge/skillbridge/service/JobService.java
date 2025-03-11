package com.skillbridge.skillbridge.service;

import java.util.List;

import com.skillbridge.skillbridge.dto.ApplicantDTO;
import com.skillbridge.skillbridge.dto.Application;
import com.skillbridge.skillbridge.dto.ApplicationStatus;
import com.skillbridge.skillbridge.dto.JobDTO;
import com.skillbridge.skillbridge.exception.JobPortalException;



public interface JobService {

	public JobDTO postJob(JobDTO jobDTO) throws JobPortalException;

	public List<JobDTO> getAllJobs() throws JobPortalException;

	public JobDTO getJob(Long id) throws JobPortalException;

	public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException;

	public List<JobDTO> getHistory(Long id, ApplicationStatus applicationStatus);

	public List<JobDTO> getJobsPostedBy(Long id) throws JobPortalException;

	public void changeAppStatus(Application application) throws JobPortalException;
	
	

}

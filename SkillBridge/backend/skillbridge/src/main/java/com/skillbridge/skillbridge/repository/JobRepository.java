package com.skillbridge.skillbridge.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.skillbridge.skillbridge.dto.ApplicationStatus;
import com.skillbridge.skillbridge.entity.Job;

public interface JobRepository extends MongoRepository<Job, Long> {
	 @Query("{ 'applicants': { $elemMatch: { 'applicantId': ?0, 'applicationStatus': ?1 } } }")
    List<Job> findByApplicantIdAndApplicationStatus(Long applicantId, ApplicationStatus applicationStatus);
	 List<Job> findByPostedBy(Long postedBy); 	
}

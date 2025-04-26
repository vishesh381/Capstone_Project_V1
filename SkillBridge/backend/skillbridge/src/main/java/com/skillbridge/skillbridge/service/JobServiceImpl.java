package com.skillbridge.skillbridge.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.skillbridge.skillbridge.dto.ApplicantDTO;
import com.skillbridge.skillbridge.dto.Application;
import com.skillbridge.skillbridge.dto.ApplicationStatus;
import com.skillbridge.skillbridge.dto.JobDTO;
import com.skillbridge.skillbridge.dto.JobStatus;
import com.skillbridge.skillbridge.dto.NotificationDTO;
import com.skillbridge.skillbridge.entity.Applicant;
import com.skillbridge.skillbridge.entity.Job;
import com.skillbridge.skillbridge.exception.JobPortalException;
import com.skillbridge.skillbridge.repository.JobRepository;
import com.skillbridge.skillbridge.repository.UserRepository;
import com.skillbridge.skillbridge.utility.Utilities;
import com.skillbridge.skillbridge.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service("jobService")
public class JobServiceImpl implements JobService {

	@Autowired
	private JobRepository jobRepository;
	@Autowired
	private NotificationService notificationService;
	@Autowired
private JavaMailSender mailSender;

@Autowired
private UserRepository userRepository;

	@Override
	public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
		if(jobDTO.getId()==0) {
			jobDTO.setId(Utilities.getNextSequenceId("jobs"));
			jobDTO.setPostTime(LocalDateTime.now());
			NotificationDTO notiDto=new NotificationDTO();
			notiDto.setAction("Job Posted");
			notiDto.setMessage("Job Posted Successfully for "+jobDTO.getJobTitle()+" at "+ jobDTO.getCompany());
			
			notiDto.setUserId(jobDTO.getPostedBy());
			notiDto.setRoute("/posted-jobs/"+jobDTO.getId());
				notificationService.sendNotification(notiDto);
		}
		else {
			Job job=jobRepository.findById(jobDTO.getId()).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
			if(job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED))jobDTO.setPostTime(LocalDateTime.now());
		}
		return jobRepository.save(jobDTO.toEntity()).toDTO();
	}

	
	@Override
	public List<JobDTO> getAllJobs() throws JobPortalException {
		return jobRepository.findAll().stream().map((x) -> x.toDTO()).toList();
	}

	@Override
	public JobDTO getJob(Long id) throws JobPortalException {
		return jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND")).toDTO();
	}

	@Override
public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
    Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
    List<Applicant> applicants = job.getApplicants();
    if (applicants == null) applicants = new ArrayList<>();
    if (applicants.stream().anyMatch(x -> x.getApplicantId().equals(applicantDTO.getApplicantId()))) {
        throw new JobPortalException("JOB_APPLIED_ALREADY");
    }

    // Set application status and add applicant
    applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
    applicants.add(applicantDTO.toEntity());
    job.setApplicants(applicants);
    jobRepository.save(job);

    // Fetch user email and send email
    User user = userRepository.findById(applicantDTO.getApplicantId())
        .orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));

    sendJobApplicationEmail(user.getEmail(), user.getName(), job.getJobTitle(),job.getCompany());
}

	private void sendJobApplicationEmail(String email, String name, String jobTitle, String jobCompany) {
    try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("Job Application Successful");

        String body = "<p>Hi " + name + ",</p>"
                    + "<p>Thank you for applying to the position of <strong>" + jobTitle + " at "+jobCompany+"</strong> on SkillBridge.</p>"
                    + "<p>We’ve successfully received your application and will keep you updated on the next steps.</p>"
                    + "<br/><p>Best regards,<br/>SkillBridge Team</p>";

        helper.setText(body, true);
        mailSender.send(message);
    } catch (MessagingException e) {
        e.printStackTrace(); // optional: add logging
    }
}


	@Override
	public List<JobDTO> getHistory(Long id, ApplicationStatus applicationStatus) {
		return jobRepository.findByApplicantIdAndApplicationStatus(id, applicationStatus).stream().map((x) -> x.toDTO())
				.toList();
	}

	@Override
	public List<JobDTO> getJobsPostedBy(Long id) throws JobPortalException {
		return jobRepository.findByPostedBy(id).stream().map((x) -> x.toDTO()).toList();
	}


	@Override
public void changeAppStatus(Application application) throws JobPortalException {
    Job job = jobRepository.findById(application.getId())
            .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
		System.out.println("companycheck+++"+job.getCompany());
    List<Applicant> apps = job.getApplicants().stream().map(applicant -> {
        if (application.getApplicantId().equals(applicant.getApplicantId())) {
            applicant.setApplicationStatus(application.getApplicationStatus());
            if (application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
                applicant.setInterviewTime(application.getInterviewTime());

                // Send Notification
                NotificationDTO notiDto = new NotificationDTO();
                notiDto.setAction("Interview Scheduled");
                notiDto.setMessage("Interview scheduled for job id: " + application.getId());
                notiDto.setUserId(application.getApplicantId());
                notiDto.setRoute("/job-history");
                try {
                    notificationService.sendNotification(notiDto);
                } catch (JobPortalException e) {
                    e.printStackTrace();
                }

                // Send Email with Jitsi link
                String jitsiLink = "https://meet.jit.si/skillbridge-interview-" + application.getId() + "-" + application.getApplicantId();

try {
    User user = userRepository.findById(application.getApplicantId())
            .orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
    sendInterviewScheduledEmail(user.getEmail(), user.getName(), job.getJobTitle(),job.getCompany(), application.getInterviewTime(), jitsiLink);
} catch (JobPortalException e) {
    e.printStackTrace(); // or log it properly
}
            }
			if (application.getApplicationStatus().equals(ApplicationStatus.OFFERED)) {
				NotificationDTO notiDto = new NotificationDTO();
                notiDto.setAction("Offer Released");
                notiDto.setMessage("Congratulations you got the offer for job id: " + application.getId());
                notiDto.setUserId(application.getApplicantId());
                notiDto.setRoute("/job-history");
                try {
                    notificationService.sendNotification(notiDto);
                } catch (JobPortalException e) {
                    e.printStackTrace();
                }
				// Send Congrats Email
				try {
					User user = userRepository.findById(application.getApplicantId())
							.orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
					sendOfferEmail(user.getEmail(), user.getName(), job.getJobTitle(), job.getCompany());
				} catch (JobPortalException e) {
					e.printStackTrace();
				}
			}if (application.getApplicationStatus().equals(ApplicationStatus.REJECTED)) {
				// Send Rejection Email
				try {
					User user = userRepository.findById(application.getApplicantId())
							.orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
					sendRejectEmail(user.getEmail(), user.getName(), job.getJobTitle(),job.getCompany());
				} catch (JobPortalException e) {
					e.printStackTrace();
				}
			}
        }
        return applicant;
    }).toList();

    job.setApplicants(apps);
    jobRepository.save(job);
}

	private void sendInterviewScheduledEmail(String email, String name, String jobTitle,String jobCompany, LocalDateTime time, String jitsiLink) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			helper.setTo(email);
			helper.setSubject("Interview Scheduled for " + jobTitle);
			System.out.println("email+++"+email);
			System.out.println("name++"+name);
			System.out.println("jobTitle+++"+jobTitle);
			System.out.println("time+++"+time);
			String formattedTime = time.toString().replace("T", " "); // You can format this better with DateTimeFormatter
			String body = "<p>Hi " + name + ",</p>"
						+ "<p>Your interview for the position of <strong>" + jobTitle + "</strong> has been scheduled.</p>"
						+ "<p><strong>Time:</strong> " + formattedTime + "</p>"
						+ "<p><strong>Meeting Link:</strong> <a href=\"" + jitsiLink + "\">Join Interview</a></p>"
						+ "<br/><p>Best regards,<br/>"+jobCompany+" Recruitment Team</p>";
	
			helper.setText(body, true);
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
	private void sendOfferEmail(String email, String name, String jobTitle, String jobCompany) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
	
			helper.setTo(email);
			helper.setSubject("🎉 Congratulations! Offer for " + jobTitle);
			
			String body = "<p>Hi " + name + ",</p>"
						+ "<p>We're thrilled to inform you that you've been <strong>offered</strong> the position of <strong>" + jobTitle + "</strong>!</p>"
						+ "<p>Please log in to your SkillBridge profile for more details and next steps.</p>"
						+ "<br/><p>Best regards,<br/>"+jobCompany+" Recruitment Team</p>";
	
			helper.setText(body, true);
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
	private void sendRejectEmail(String email, String name, String jobTitle,String jobCompany) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
	
			helper.setTo(email);
			helper.setSubject("Update on your application for " + jobTitle);
			
			String body = "<p>Hi " + name + ",</p>"
						+ "<p>We're regret to inform you that we are unable to proceed with your application for the position of <strong>" + jobTitle + "</strong>! as we have received applications that more closely match the required qualifications.</p>"
						+ "<p>We wish you luck for your job hunt.</p>"
						+ "<br/><p>Best regards,<br/>"+jobCompany+" Recruitment Team</p>";
	
			helper.setText(body, true);
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}

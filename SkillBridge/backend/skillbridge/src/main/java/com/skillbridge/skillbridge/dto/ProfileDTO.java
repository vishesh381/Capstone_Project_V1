package com.skillbridge.skillbridge.dto;

import java.util.Base64;
import java.util.List;

import com.skillbridge.skillbridge.entity.Profile;
import com.skillbridge.skillbridge.dto.Certification;
import com.skillbridge.skillbridge.dto.Experience;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private String picture;  // Base64-encoded string for picture
    private Long totalExp;
    private List<String> skills;
    private List<Experience> experiences;
    private String resume;   // Base64-encoded string for resume
    private List<Certification> certifications;
    private List<Long> savedJobs;

    // Convert DTO to Entity
    public Profile toEntity() {
        return new Profile(this.id, this.name, this.email, this.jobTitle, this.company, this.location, this.about,
            this.picture != null ? Base64.getDecoder().decode(this.picture) : null, 
            this.totalExp, this.skills, this.experiences,
            this.resume != null ? Base64.getDecoder().decode(this.resume) : null,
            this.certifications, this.savedJobs);
    }
}

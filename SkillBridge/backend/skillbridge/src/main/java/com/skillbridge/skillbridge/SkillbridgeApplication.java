package com.skillbridge.skillbridge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SkillbridgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkillbridgeApplication.class, args);
	}

}
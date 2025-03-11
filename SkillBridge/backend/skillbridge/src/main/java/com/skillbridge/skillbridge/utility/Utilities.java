package com.skillbridge.skillbridge.utility;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.skillbridge.skillbridge.entity.Sequence;
import com.skillbridge.skillbridge.exception.JobPortalException;

@Component
public class Utilities {
	private static MongoOperations mongoOperation;

	@Autowired
	public void setMongoOperation(MongoOperations mongoOperation) {
		Utilities.mongoOperation = mongoOperation;
	}

	public static Long getNextSequenceId(String key) throws JobPortalException {
		Query query = new Query(Criteria.where("_id").is(key));
		Update update = new Update();
		update.inc("seq", 1);
		// Log the query and update for debugging
		System.out.println("Query: " + query.toString());
		System.out.println("Update: " + update.toString());
		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);
		Sequence seqId = mongoOperation.findAndModify(query, update, options, Sequence.class);
		System.out.println("seqId"+seqId);
		if (seqId == null) {
			throw new JobPortalException("Unable to get sequence id for key : " + key);
		}

		return seqId.getSeq();
	}

	public static String generateOTP() {
		StringBuilder otp = new StringBuilder();
		SecureRandom secureRandom = new SecureRandom();
		for (int i = 0; i < 6; i++) {
			otp.append(secureRandom.nextInt(10));
		}
		return otp.toString();
	}
}

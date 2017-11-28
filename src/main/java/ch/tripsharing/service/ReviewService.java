package ch.tripsharing.service;

import java.util.List;

import ch.tripsharing.domain.Review;
import ch.tripsharing.domain.User;

public interface ReviewService {
	Review saveReview(Review review);
	Review findByID(String id);
	List<Review> findAll();
	List<Review> findByUser(User user);
	Review updateReview(Review review);
	void deleteById(String id);
}

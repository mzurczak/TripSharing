package ch.tripsharing.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.tripsharing.domain.Review;
import ch.tripsharing.domain.User;
import ch.tripsharing.repository.ReviewRepository;
import ch.tripsharing.repository.UserRepository;

@Service
@Transactional
public class DefaultReviewService implements ReviewService {
	
	private final ReviewRepository reviewRepository;
	
	@Autowired
	public DefaultReviewService(ReviewRepository reviewRepository, UserRepository userRepository) {
		this.reviewRepository = reviewRepository;
	}

	@Override
	public Review saveReview(Review review) {
		User reviewedUser = review.getUser();
		reviewedUser.addReviewReceived(review);
		return this.reviewRepository.save(review);
	}

	@Override
	public Review findByID(String id) {
		return this.reviewRepository.findById(id);
	}

	@Override
	public List<Review> findAll() {
		return this.reviewRepository.findAll();
	}

	@Override
	public Review updateReview(Review review) {
		String id = review.getId();
		Review reviewToUpdate = this.reviewRepository.findById(id);
		if ( id == null || reviewToUpdate == null ) {
			return null; 
		}
		if ( review.getText() != null ) {
			reviewToUpdate.setText(review.getText());
		}
		if ( review.getRating() != null ) {
			reviewToUpdate.setRating(review.getRating());
		}
		return this.reviewRepository.findById(id);
	}

	@Override
	public void deleteById(String id) {
		Review review = reviewRepository.findById(id);
		review.getUser().removeReviewReceived(review);
		this.reviewRepository.deleteById(id);
	}

	@Override
	public List<Review> findByUser(User user) {
		return this.reviewRepository.findByUser(user);
	}

}

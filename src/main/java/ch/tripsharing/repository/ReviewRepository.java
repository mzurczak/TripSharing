package ch.tripsharing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.tripsharing.domain.Review;
import ch.tripsharing.domain.User;

public interface ReviewRepository extends JpaRepository<Review, String>{

	Review findById(String id);
	List<Review> findByUser(User user);
	void deleteById(String id);
	
}

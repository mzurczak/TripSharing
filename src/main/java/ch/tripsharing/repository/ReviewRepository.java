package ch.tripsharing.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.tripsharing.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, String>{

	Review findById(String id);
	void deleteById(String id);
	
}

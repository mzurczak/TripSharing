package ch.tripsharing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.tripsharing.domain.User;


@Repository
public interface UserRepository extends JpaRepository<User, String>{
	
	User findById(String id);
	User findByEmail(String email);
	User findByUsername(String username);
	void deleteById(String id);
	
}

package ch.tripsharing.service;

import java.util.List;

import ch.tripsharing.domain.User;

public interface UserService {

	User save(User user);
	User findById(String id);
	List<User> findAll();
	User findByEmail(String email);
	User findByUserName(String username);
	User updateUser(User user);
	void deleteUserById(String id);
}

package ch.tripsharing.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ch.tripsharing.domain.User;
import ch.tripsharing.repository.UserRepository;

@Service
@Transactional
public class DefaultUserService implements UserService{

	private final UserRepository userRepository;
	private final ReviewService reviewService;
	private final BCryptPasswordEncoder bcrypt;
	
	@Autowired
	public DefaultUserService(UserRepository userRepository, ReviewService reviewService, BCryptPasswordEncoder bcrypt) {
		this.userRepository = userRepository;
		this.reviewService = reviewService;
		this.bcrypt = bcrypt;
	}
	
	@Override
	public User save(User user) {
		String password = user.getPassword();
		user.setPassword(bcrypt.encode(password));
		return this.userRepository.save(user);
	}

	@Override
	public User findById(String id) {
		return this.userRepository.findById(id);
	}

	@Override
	public List<User> findAll() {
		return this.userRepository.findAll();
	}

	@Override
	public User findByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}

	@Override
	public User findByUserName(String username) {
		return this.userRepository.findByUsername(username);
	}

	@Override
	public User updateUser(User user) {
		String id = user.getId();
		if (id == null) {
			return null;
		}
		User userFromRepo =  this.userRepository.findById(id);
		if (userFromRepo == null) {
			return null;
		}
		if (user.getEmail() != null) {
			userFromRepo.setEmail(user.getEmail());
		}
		if (user.getFirstName() != null) {
			userFromRepo.setFirstName(user.getFirstName());
		}
		if (user.getLastName() != null) {
			userFromRepo.setLastName(user.getLastName());
		}
		if (user.getPassword() != null) {
			userFromRepo.setPassword(user.getPassword());
		}
		return this.userRepository.findById(id);
	}

	@Override
	public void deleteUserById(String id) {
		User user = this.userRepository.findById(id);
		this.reviewService
			.findByUser(user)
			.forEach( review -> {
				this.reviewService.deleteById(review.getId());
			});
		this.userRepository.deleteById(id);
	}

}

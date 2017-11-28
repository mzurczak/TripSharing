package ch.tripsharing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.tripsharing.domain.Trip;
import ch.tripsharing.domain.User;

public interface TripRepository extends JpaRepository<Trip, String>{

	Trip findById(String id);
	List<Trip> findByName(String name);
//	List<Trip> findByPlaces(String place);
	Trip findByHost(User user);
	void deleteById(String id);
}

package ch.tripsharing.repository;

import java.util.List;

import ch.tripsharing.domain.Trip;

public interface TripRepository {

	Trip findById(String id);
	List<Trip> findByTitle(String title);
	List<Trip> findByPlace(String place);
	void deleteById(String id);
}

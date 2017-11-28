package ch.tripsharing.service;

import java.util.List;

import ch.tripsharing.domain.Trip;

public interface TripService {

	Trip saveTrip( Trip trip );
	Trip updateTrip ( Trip trip );
	Trip findById ( String id );
	List<Trip> findByPlace ( String place );
	List<Trip> findByName( String name );
	void deleteById( String id );
}

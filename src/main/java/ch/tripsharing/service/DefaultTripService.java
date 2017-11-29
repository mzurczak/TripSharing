package ch.tripsharing.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.tripsharing.domain.Trip;
import ch.tripsharing.domain.User;
import ch.tripsharing.repository.TripRepository;
import ch.tripsharing.repository.UserRepository;

@Service
@Transactional
public class DefaultTripService implements TripService {

	private final TripRepository tripRepository;
	private final UserRepository userRepository;
	
	@Autowired
	public DefaultTripService(TripRepository tripRepository, UserRepository userRepository) {
		this.tripRepository = tripRepository;
		this.userRepository = userRepository;
	}
	
	@Override
	public Trip saveTrip(Trip trip) {
		User user = this.userRepository.findById(trip.getHost().getId());
		user.addTripHosted(trip);
		return this.tripRepository.save(trip);
	}

	@Override
	public Trip updateTrip(Trip trip) {
		
		String id = trip.getId();
		if ( id == null ) {
			return null; 
		}
		Trip tripToUpdate = this.tripRepository.findById(id);
		if ( tripToUpdate == null ) {
			return null; 
		}
		if ( trip.getName() != null ) {
			tripToUpdate.setName(trip.getName());
		}
		if ( trip.getDescription() != null ) {
			tripToUpdate.setDescription(trip.getDescription());
		}
		if ( trip.getHost() != null ) {
			tripToUpdate.setHost(trip.getHost());
		}
		if ( trip.getStartDate() != null ) {
			tripToUpdate.setStartDate(trip.getStartDate());
		}
		if ( trip.getEndDate() != null ) {
			tripToUpdate.setEndDate(trip.getEndDate());
		}
		if ( trip.getPhoto() != null ) {
			tripToUpdate.setPhoto(trip.getPhoto());
		}
		if ( trip.getPlaces() != null ) {
			List<String> places = tripToUpdate.getPlaces();
			trip.getPlaces()
				.forEach(place -> {
					if (!places.contains(place)) {
						places.add(place);
					}
				});
			tripToUpdate.setPlaces(places);
		}
		if ( trip.getParticipants() != null ) {
			List<User> participants = tripToUpdate.getParticipants();
			trip.getParticipants()
				.forEach(person -> {
					if (!participants.contains(person)) {
						participants.add(person);
						person.addTripAttended(trip);
					}
				});
			tripToUpdate.setParticipants(participants);
		}
		if ( trip.getTransportation() != null ) {
			tripToUpdate.setTransportation(trip.getTransportation());
		}
		return this.tripRepository.findById(id);
	}

	@Override
	public Trip findById(String id) {
		return this.tripRepository.findById(id);
	}

	@Override
	public List<Trip> findByPlace(String place) {
		List<Trip> searchResults = new ArrayList<>();
		List<Trip> allTrips = this.tripRepository.findAll();
		allTrips.forEach(trip -> {
			if (trip.getPlaces().contains(place)) {
				searchResults.add(trip);
			}
		});
		return searchResults;
	}

	@Override
	public List<Trip> findByName(String name) {
		return this.tripRepository.findByName(name);
	}
	
	@Override
	public List<Trip> findByNameIgnoreCaseContaining(String name) {
		return this.tripRepository.findByNameIgnoreCaseContaining(name);
	}

	@Override
	public void deleteById(String id) {
		Trip trip = this.tripRepository.findById(id);
		trip.getHost().getTripsHosted().remove(trip);
		trip.getParticipants()
			.forEach( user -> {
				user.getTripsAttended().remove(trip);
			});
		this.tripRepository.deleteById(id);
	}

	@Override
	public List<Trip> findAll() {
		return this.tripRepository.findAll();
	}

}

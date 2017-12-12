package ch.tripsharing.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import ch.tripsharing.domain.JsonViews;
import ch.tripsharing.domain.Trip;
import ch.tripsharing.domain.User;
import ch.tripsharing.security.JwtUtil;
import ch.tripsharing.service.TripService;
import ch.tripsharing.service.UserService;

@RestController
@RequestMapping( "/api/trips" )
public class RestTripController {

	private final String tokenHeader = "Authorization";
	private final TripService tripService;
	private final UserService userService;
    private final JwtUtil jwtUtil;
	
	
	@Autowired
	public RestTripController (TripService tripService, UserService userService, JwtUtil jwtUtil) {
		this.tripService = tripService;
		this.userService = userService;
		this.jwtUtil = jwtUtil;
	}
	
    private boolean isAuthenticated(HttpServletRequest request, String id) {
		String token = request.getHeader(tokenHeader).substring(7);
        String username = jwtUtil.getUsernameFromToken(token);
        User user = this.userService.findByUserName(username);
        if (user.getId().equals(id)) {
        		return true;
        }
        return false;
	}
	
	@GetMapping( "/" )
	@JsonView( JsonViews.TripDetails.class )
	public List<Trip> getAll() {
		return this.tripService.findAll();
	}
	
	@GetMapping ( "/{id}" )
	@JsonView( JsonViews.TripDetails.class )
	public Trip getTrip( @PathVariable String id ) {
		return this.tripService.findById(id);
	}
	
	@GetMapping ( "/searchName")
	@JsonView( JsonViews.TripDetails.class )
	public List<Trip> searchByName(@RequestParam( value = "name", required = true) String name){
		return this.tripService.findByNameIgnoreCaseContaining(name);
	}
	
	@GetMapping ( "/searchPlace")
	@JsonView( JsonViews.TripDetails.class )
	public List<Trip> searchByPlace(@RequestParam( value = "place", required = true) String place){
		return this.tripService.findByPlace(place);
	}
	
	@PostMapping( "/create")
	@JsonView( JsonViews.TripDetails.class )
	public Trip createTrip( @RequestBody Trip json, HttpServletRequest request) {
		String title = json.getName();
		String description = json.getDescription();
		String token = request.getHeader(tokenHeader).substring(7);
		User host = this.userService.findByUserName(jwtUtil.getUsernameFromToken(token));
		String startDate = json.getStartDate();
		String endDate = json.getEndDate();
		String photo = json.getPhoto();
		List<String> newPlace = json.getPlaces();
		String transportation = json.getTransportation();
		String budget = json.getBudget();
		
		if ( title == null || description == null || host == null ) {
			return null;
		}
		
		Trip newTrip = new Trip( title, description, host, startDate, endDate, photo, newPlace, null, transportation, budget);
		if (isAuthenticated(request, host.getId())) {
			return this.tripService.saveTrip(newTrip);
		}
		return null;
	}
	
	@PutMapping( "/{tripId}")
	@JsonView( JsonViews.TripDetails.class )
	public Trip editTrip( @RequestBody Trip json, @PathVariable String tripId, HttpServletRequest request) {
		String token = request.getHeader(tokenHeader).substring(7);
		User currentUser = this.userService.findByUserName(jwtUtil.getUsernameFromToken(token));
		String title = json.getName();
		String description = json.getDescription();
		User host = this.tripService.findById(tripId).getHost();
		String startDate = json.getStartDate();
		String endDate = json.getEndDate();
		String photo = json.getPhoto();
//		
		List<String> newPlace = json.getPlaces();
		List<User> newParticipant = json.getParticipants();
		User user = null;
		if (newParticipant != null) {
			String newParticipantId= newParticipant.get(0).getId();
			user = userService.findById(newParticipantId);
		}
		String transportation = json.getTransportation();
		String budget = json.getBudget();
		Trip newTrip = new Trip(tripId, title, description, host, startDate, endDate, photo, newPlace, user, transportation, budget);
		
		if (isAuthenticated(request, currentUser.getId())) {
			return this.tripService.updateTrip(newTrip);
		}
		return null;
	}
	
	@DeleteMapping( "/{id}" )
	public void deleteTrip(@PathVariable String id, HttpServletRequest request) {
		User host = this.tripService.findById(id).getHost();
		if (isAuthenticated(request, host.getId())) {
			this.tripService.deleteById(id);
		}
	}
}

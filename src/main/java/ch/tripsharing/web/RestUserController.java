package ch.tripsharing.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import ch.tripsharing.domain.JsonViews;
import ch.tripsharing.domain.User;
import ch.tripsharing.security.JwtUtil;
import ch.tripsharing.security.service.JwtAuthenticationResponse;
import ch.tripsharing.service.UserService;

@RestController
@RequestMapping( "/api/users" )
public class RestUserController {

	private final String tokenHeader = "Authorization";
	private final UserService userService;
	private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    
    @Autowired
	public RestUserController(UserService userService, UserDetailsService userDetailsService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
		this.userService = userService;
		this.userDetailsService = userDetailsService;
		this.jwtUtil = jwtUtil;
		this.authenticationManager = authenticationManager;
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
	
	@PostMapping( "/sign_up" )
	@JsonView( JsonViews.ReviewListInUser.class )
	public User createUser(@RequestBody Map<String, String> json) {
		String username = json.get("username");
		String firstName = json.get("firstName");
		String lastName = json.get("lastName");
		String email = json.get("email");
		String password = json.get("password");
		if (username == null || firstName == null || lastName == null || email == null || password == null) {
			return null;
		}
		User user = new User(username, firstName, lastName, email, password);
		return this.userService.save(user);
	}
	
	@PostMapping( "/sign_in" )
	public ResponseEntity<?> login(@RequestBody Map<String, String> json, Device device) {
		String username = json.get("username");
		String password = json.get("password");
		// Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        final String token = jwtUtil.generateToken(userDetails, device);

        // Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
	}
	
	@GetMapping( "/me" )
	@JsonView( JsonViews.ReviewListInUser.class )
	public User getMe(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader).substring(7);
		String username = jwtUtil.getUsernameFromToken(token);
		return this.userService.findByUserName(username);
	}
	
	@GetMapping( "/{id}" )
	@JsonView( JsonViews.ReviewListInUser.class )
	public User getUser(@PathVariable String id) {
		return this.userService.findById(id);
	}
	
	@DeleteMapping( "/{id}" )
	@ResponseStatus( value = HttpStatus.NO_CONTENT )
	public void deleteUser(@PathVariable String id, HttpServletRequest request) {
        if (isAuthenticated(request, id)) {
        		this.userService.deleteUserById(id);        	
        }
	}
	
	@PutMapping( "/{id}" )
	public User updateUser(@PathVariable String id, @RequestBody Map<String, String> json, HttpServletRequest request) {
		String token = request.getHeader(tokenHeader).substring(7);
		String username = jwtUtil.getUsernameFromToken(token);
		String firstName = json.get("firstName");
		String lastName = json.get("lastName");
		String email = json.get("email");
		String password = json.get("password");
	
		User user = new User (id, username, firstName, lastName, email, password);
		if (isAuthenticated(request, id)) {
			return this.userService.updateUser(user);
		} 
		return null;
	}
}

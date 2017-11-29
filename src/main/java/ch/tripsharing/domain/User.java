package ch.tripsharing.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonView;

import ch.tripsharing.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table( name = "users" )
@NoArgsConstructor
@EqualsAndHashCode( exclude = { "id" } )
@ToString( exclude = { "password"} )
@Data
@Component
public class User implements UserDetails {

	
	private static final long serialVersionUID = 2107258274129956352L;

	private static RoleRepository roleRepository;
	
	@Autowired
	public void setRoleRepository(RoleRepository roleRepository) {
		User.roleRepository = roleRepository;
	}
	
	@Id
	@Setter( AccessLevel.PRIVATE )
	@JsonView( JsonViews.Summary.class )
	private String id;
	
	@JsonView( JsonViews.Summary.class )
	@Column( unique = true, nullable = false )	
	private String username;
	
	@JsonView( JsonViews.Summary.class )
	@Column( name = "first_name", nullable = false, length = 50 )
	private String firstName;
	
	@JsonView( JsonViews.Summary.class )
	@Column( name = "last_name", nullable = false, length = 50 )
	private String lastName;
	
	@JsonView( JsonViews.Summary.class )
	@Column( unique = true, nullable = false )
	private String email;
	
	@Column( nullable = false, length = 100 )
	private String password;
	
	@JsonView( JsonViews.Summary.class )
	@OneToMany( mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY )
	private List<Review> reviewsReceived = new ArrayList<>();

	@JsonView( JsonViews.ReviewListInUser.class )
	@OneToMany( mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY )
	private List<Review> reviewsGiven = new ArrayList<>();
	
	@JsonView( JsonViews.TripListInUser.class )
	@OneToMany( mappedBy = "host", cascade = CascadeType.ALL, fetch = FetchType.EAGER )
	@ElementCollection(targetClass=Trip.class)
	private Collection<Trip> tripsHosted = new LinkedHashSet<>();
	
	@JsonView( JsonViews.TripListInUser.class )
	@ElementCollection(targetClass=Trip.class)
	private Set<Trip> tripsAttended = new HashSet<>();
	
	@ManyToMany( fetch = FetchType.EAGER )
	@JoinTable( name = "user_roles" )
	private Set<Role> roles = new HashSet<>();

	public User(String id, String username, String firstName, String lastName, String email, String password) {
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.roles.add(roleRepository.findByName(Role.ROLE_USER));
	}
	
	public User(String username, String firstName, String lastName, String email, String password) {
		this(null, username, firstName, lastName, email, password);
	}
	
	public void addReviewReceived(Review review) {
		this.reviewsReceived.add(review);
	}
	
	public void removeReviewReceived(Review review) {
		int index = this.reviewsReceived.indexOf(review);
		if ( index != -1 ) {
			this.reviewsReceived.remove(index);			
		}
	}
	
	public void addTripHosted(Trip trip) {
		this.tripsHosted.add(trip);
	}

	public void removeTripHosted(Trip trip) {
		this.tripsHosted.add(trip);
	}
	
	public void addTripAttended(Trip trip) {
		this.tripsAttended.add(trip);
	}
	
	public void removeTripAttended(Trip trip) {
		this.tripsAttended.add(trip);
	}
	
	public void addRole(Role role) {
		this.roles.add(role);
	}
	
	public void removeRole(Role role) {
		this.roles.remove(role);
	}
	
	@PrePersist
	public void onCreate() {
		String uuid = UUID.randomUUID().toString();
		setId(uuid);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if (getRoles() == null) {
			return Collections.emptySet();
		}
		return getRoles().stream()
				.map(Role::getName)
				.map(String::toUpperCase)
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toSet());
	}

	@Override
	public boolean isAccountNonExpired() {
		return isEnabled();
	}

	@Override
	public boolean isAccountNonLocked() {
		return isEnabled();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return isEnabled();
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
}

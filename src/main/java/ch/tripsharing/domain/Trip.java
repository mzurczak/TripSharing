package ch.tripsharing.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table ( name = "Trips" )
@Data
@EqualsAndHashCode ( exclude = { "id" } )
@NoArgsConstructor
public class Trip {
	
	@Id
	@Setter( AccessLevel.PRIVATE )
	@JsonView( JsonViews.Summary.class )
	private String id;
	
	@Column( nullable = false, length = 50, unique = true)
	@JsonView( JsonViews.Summary.class )
	private String name;
	
	@Column( length = 1000 )
	@JsonView( JsonViews.Summary.class )
	private String description;
	
	@JsonView( JsonViews.Summary.class )
	@ManyToOne 
//	@ElementCollection( targetClass = User.class )
	private User host;
	
	@Column( name = "start_date", length = 20 )
	@JsonView( JsonViews.Summary.class )
	private String startDate;
	
	@Column( name = "end_date", length = 20 )
	@JsonView( JsonViews.Summary.class )
	private String endDate;
	
	@JsonView( JsonViews.Summary.class )
	private String photo;
	
	@Column ( name = "places" )
	@JsonView( JsonViews.Summary.class )
	@ElementCollection( targetClass = String.class )
	private List<String> places = new ArrayList<>();
	
	@JsonView( JsonViews.UserListInTrip.class )
	@ManyToMany
	private List<User> participants = new ArrayList<>();
	
	@Column
	private String transportation;
	
//	private Integer cost;
	
	@PrePersist
	public void onCreate() {
		String uuid = UUID.randomUUID().toString();
		setId(uuid);
	}

	public Trip(String id, String title, String description, User organizer, String startDate, String endDate) {
		this.name = title;
		this.description = description;
		this.host = organizer;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	public Trip(String title, String description, User organizer, String startDate, String endDate) {
		this(null, title, description, organizer, startDate, endDate);
	}
	
	public void addPlace(String place) {
		int index = this.places.indexOf(place);
		if ( index != -1 ) {
			this.places.add(place);
		}
	}
	
	public void removePlace(String place) {
		this.places.remove(place);
	}
	
	public void addParticipant(User user) {
		int index = this.participants.indexOf(user);
		if ( index != -1 ) {
			this.participants.add(user);
		}
	}
	
	public void removeParticipant(User user) {
		int index = this.participants.indexOf(user);
		if ( index != -1 ) {
			this.participants.remove(index);			
		}
	}
	
	public void addPhoto(String url) {
		this.photo = url;
	}
	
	public void removePhoto() {
		this.photo = "";
	}
	
	public void addTransportation(String transportation) {
		this.transportation = transportation;
	}

	public void removeTransportation() {
		this.transportation = "";
	}
	

}

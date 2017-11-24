package ch.tripsharing.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
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
	private String title;
	
	@Column( length = 1000 )
	@JsonView( JsonViews.Summary.class )
	private String description;
	
	@Column( name = "start_date", length = 20)
	@JsonView( JsonViews.Summary.class )
	private String startDate;
	
	@Column( name = "end_date", length = 20)
	@JsonView( JsonViews.Summary.class )
	private String endDate;
	
	@JsonView( JsonViews.Summary.class )
	private String photo;
	
	@Column
	@JsonView( JsonViews.Summary.class )
	private List<String> places = new ArrayList<>();
	
	@JsonView( JsonViews.UserListInTrip.class )
	@ManyToMany
	private List<User> participants = new ArrayList<>();
	
	
	private String transportation;
	
	private Integer cost;
	
	@PrePersist
	public void onCreate() {
		String uuid = UUID.randomUUID().toString();
		setId(uuid);
	}

	public Trip(String title, String description, String startDate, String endDate, List<String> places) {
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.places = places;
	}
	
	
	
	

}

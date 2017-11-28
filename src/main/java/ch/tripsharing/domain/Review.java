package ch.tripsharing.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table( name = "reviews" )
@Data
@NoArgsConstructor
@EqualsAndHashCode ( exclude = { "id" } )
@ToString ( exclude = { "user" })
public class Review implements Serializable{ 

	private static final long serialVersionUID = 2337558304194645954L;

	@Id
	@Setter( AccessLevel.PRIVATE )
	@JsonView( JsonViews.Summary.class )
	private String id;
	
	@JsonView( JsonViews.Summary.class )
	private String author;
	
	@JsonView( JsonViews.Summary.class )
	@Column( nullable = false )
	private String text;
	
	@JsonView( JsonViews.Summary.class )
	@Column( nullable = false )
	private Integer rating;
		
	@JsonView( JsonViews.Summary.class )
	@Column( name = "date_created", updatable = false, nullable = false )
	private LocalDateTime dateCreated = LocalDateTime.now();
	
	@JsonView( JsonViews.ReviewDetails.class )
	@ManyToOne
	private User user;

	public Review(String id, String author, String text, Integer rating, User user, LocalDateTime dateCreated) {
		this.id = id;
		this.author = author;
		this.text = text;
		this.rating = rating;
		this.user = user;
		this.dateCreated = dateCreated;
	}
	
	public Review(String author, String text, Integer rating, User user) {
		this(null, author, text, rating, user, LocalDateTime.now());
	}
	
	@PrePersist
	public void onCreate() {
		String uuid = UUID.randomUUID().toString();
		setId(uuid);
	}
}

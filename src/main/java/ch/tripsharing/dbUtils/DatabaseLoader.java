package ch.tripsharing.dbUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import ch.tripsharing.domain.Review;
import ch.tripsharing.domain.Role;
import ch.tripsharing.domain.Trip;
import ch.tripsharing.domain.User;
import ch.tripsharing.repository.ReviewRepository;
import ch.tripsharing.repository.RoleRepository;
import ch.tripsharing.repository.TripRepository;
import ch.tripsharing.repository.UserRepository;

@Component
public class DatabaseLoader implements ApplicationRunner{

	private UserRepository userRepository;
	private TripRepository tripRepository;
	private ReviewRepository reviewRepository;
	private RoleRepository roleRepository;
	
	@Autowired
	public DatabaseLoader(UserRepository userRepository, TripRepository tripRepository,
			ReviewRepository reviewRepository, RoleRepository roleRepository) {
		this.userRepository = userRepository;
		this.tripRepository = tripRepository;
		this.reviewRepository = reviewRepository;
		this.roleRepository = roleRepository;
	}
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		
		Role ROLE_USER = new Role(Role.ROLE_USER);
		Role ROLE_ADMIN = new Role(Role.ROLE_ADMIN);
		if ( null == roleRepository.findByName(ROLE_USER.getName()) ) {
			ROLE_USER = roleRepository.save(ROLE_USER);			
		}
		if ( null == roleRepository.findByName(ROLE_ADMIN.getName()) ) {
			ROLE_ADMIN = roleRepository.save(ROLE_ADMIN);
		}
		
		
		User[] userArr = new User[11];
		userArr[0] = new User("mzurczak", "Michal", "Michal", "michal@mail.com", "zurczak");
		userArr[0].addRole(ROLE_ADMIN);
		userArr[1] = new User("llebovitz", "Lukas", "Lebovitz", "lukas@mail.com", "lebovitz");
		userArr[2] = new User("jsavor", "Jeremy", "Savor", "jeremy@mail.com", "savor");
		userArr[3] = new User("kbeyler", "Kim", "Beyeler", "kim@mail.com", "beyler");
		userArr[4] = new User("fwanner", "Fabio", "Wanner", "fabio@mail.com", "wanner");
		userArr[5] = new User("gperdomo", "Gabriel", "Perdomo", "gabriel@mail.com", "perdomo");
		userArr[6] = new User("jsavina", "Julya", "Savina", "julia@mail.com", "savina");
		userArr[7] = new User("jmuhlebach", "Jurg", "Muhlebach", "jurg@mail.com", "muhlebach");
		userArr[8] = new User("lbohale", "Laz", "Bohale", "laz@mail.com", "bohale");
		userArr[9] = new User("ppintaske", "Patric", "Pintaske", "patric@mail.com", "pintaske");
		userArr[10] = new User("lhoxhaj", "Laurent", "Hoxhaj", "laurent@mail.com", "hoxhaj");
		
		for( User user: userArr) {
			if (null == userRepository.findByUsername(user.getUsername())) {
				userRepository.save(user);
			}
		}
		
		Trip[] tripArr = new Trip[3];
		tripArr[0] = new Trip("Octoberfest adventure!", 
				"Let's have fun on the most popular beer fest!",
				userRepository.findByUsername("ppintaske"),
				"2018-10-01", 
				"2018-10-03" 
				);
		
		tripArr[0].addPlace("Monachium, Germany");
		tripArr[0].addPhoto("https://www.wombats-hostels.com/blog/wp-content/uploads/2015/09/M%C3%BCnchen_Sch%C3%BCtzen-Festzelt_Oktoberfest_2012_01.jpg");
		
		tripArr[1] = new Trip("Carnaval in Rio!", 
				"Experience the best carnaval in the whole world!",
				userRepository.findByUsername("gperdomo"),
				"2018-02-09", 
				"2018-02-14"
				);
		tripArr[1].addPlace("Rio, Brasil");
		tripArr[1].addPhoto("http://assets.nydailynews.com/polopoly_fs/1.16108.1313673232!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/gal-brazil-carnival-13-jpg.jpg");
		
		tripArr[2] = new Trip("Explore New York", 
				"We are looking for the people, that are dreaming of visiting the greatest city in the world!",
				userRepository.findByUsername("ppintaske"),
				"2019-04-03", 
				"2019-04-03" 
				);
		tripArr[2].addPlace("Rio, Brasil");
		tripArr[2].addPhoto("http://assets.nydailynews.com/polopoly_fs/1.16108.1313673232!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/gal-brazil-carnival-13-jpg.jpg");
		
		for (Trip trip: tripArr) {
			if (0 == tripRepository.findByTitle(trip.getTitle()).size()) {
				tripRepository.save(trip);
				trip.getHost().addTripHosted(trip);
			}
		}
		
		Review[] reviewsArr = new Review[2];
		reviewsArr[0] = new Review(
				userRepository.findByUsername("ppintaske").getId(),
				"This dude is crazy! So many great memories! Looking forward to next trips together!",
				5,
				userRepository.findByUsername("jsavor"));
		reviewsArr[1] = new Review(
				userRepository.findByUsername("jmuhlebach").getId(),
				"You will never be bored with her! Jokes, jokes everywhere!",
				5,
				userRepository.findByUsername("jsavina"));	
		
		for ( Review review : reviewsArr ) {
			if ( null == reviewRepository.findById(review.getId())) {
				reviewRepository.save(review);
			}
		}
				
	}

}

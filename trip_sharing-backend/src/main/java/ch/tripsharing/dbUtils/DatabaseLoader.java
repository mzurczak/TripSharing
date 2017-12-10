package ch.tripsharing.dbUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

//import ch.tripsharing.domain.Review;
import ch.tripsharing.domain.Role;
import ch.tripsharing.domain.Trip;
import ch.tripsharing.domain.User;
//import ch.tripsharing.repository.ReviewRepository;
import ch.tripsharing.repository.RoleRepository;
import ch.tripsharing.repository.TripRepository;
import ch.tripsharing.service.UserService;

@Component
public class DatabaseLoader implements ApplicationRunner{

	private UserService userService;
	private TripRepository tripRepository;
//	private ReviewRepository reviewRepository;
	private RoleRepository roleRepository;
	
	@Autowired
	public DatabaseLoader(UserService userService, TripRepository tripRepository, RoleRepository roleRepository) {
		this.userService = userService;
		this.tripRepository = tripRepository;
//		this.reviewRepository = reviewRepository;
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
		
		
		User[] userArr = new User[12];
		userArr[0] = new User("mzurczak", "Michal", "Zurczak", "michal@mail.com", "zurczak");
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
		userArr[11] = new User("dzurczak", "Dominika", "Zurczak", "dominika@mail.com", "zurczak");
		
		for( User user: userArr) {
			if (null == userService.findByUserName(user.getUsername())) {
				userService.save(user);
			}
		}
		
		Trip[] tripArr = new Trip[4];
		tripArr[0] = new Trip("Octoberfest adventure!", 
				"Let's have fun on the most popular beer fest!",
				userService.findByUserName("ppintaske"),
				"01/10/2018", 
				"03/10/2018",
				"https://www.wombats-hostels.com/blog/wp-content/uploads/2015/09/M%C3%BCnchen_Sch%C3%BCtzen-Festzelt_Oktoberfest_2012_01.jpg",
				null,
				userService.findByUserName("gperdomo"),
				"Train",
				"100$"
				);
		
		tripArr[1] = new Trip("Carnaval in Rio!", 
				"Experience the best carnaval in the whole world!",
				userService.findByUserName("gperdomo"),
				"09/02/2018",
				"14/02/2018",
				"https://festivalsherpa-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/theworldfestival-fest.jpg",
				null,
				userService.findByUserName("mzurczak"),
				"Flight",
				"800$"
				);
		
		tripArr[2] = new Trip("Explore New York", 
				"We are looking for the people, that are dreaming of visiting the greatest city in the world!",
				userService.findByUserName("dzurczak"),
				"25/05/2019", 
				"14/06/2019",
				"https://media.timeout.com/images/103444978/image.jpg",
				null,
				userService.findByUserName("mzurczak"),
				"Flight",
				"1500$"
				);
		
		tripArr[3] = new Trip("Saas-fee ski paradise !",
				"Hey people! The Alps are already snow-bound. That means this is the best time to go ski! We are looking for 8 people to complete the group and save money on the ski passes!",
				userService.findByUserName("mzurczak"),
				"2017-12-16",
				"2017-12-17",
				"http://res.cloudinary.com/ds57cmzxo/image/upload/f_auto,q_80/Webseite/Bildergalerie/skifahren-kreuzboden",
				null,
				null,
				"train",
				"60$"
				);
		
		
		for (Trip trip: tripArr) {
			if (0 == tripRepository.findByName(trip.getName()).size()) {
				tripRepository.save(trip);
				trip.getHost().addTripHosted(trip);
			}
		}
		
//		Review[] reviewsArr = new Review[2];
//		reviewsArr[0] = new Review(
//				userService.findByUserName("ppintaske"),
//				"This dude is crazy! So many great memories! Looking forward to next trips together!",
//				5,
//				userService.findByUserName("jsavor"));
//		reviewsArr[1] = new Review(
//				userService.findByUserName("jmuhlebach"),
//				"You will never be bored with her! Jokes, jokes everywhere!",
//				5,
//				userService.findByUserName("jsavina"));	
//		
//		for ( Review review : reviewsArr ) {
//			if ( null == reviewRepository.findById(review.getId())) {
//				reviewRepository.save(review);
//			}
//		}
				
	}

}

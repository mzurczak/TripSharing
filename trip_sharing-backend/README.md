# TripSharing backend

### Backend stack
* Java8
* Spring Framework
* H2 

## Features
* A user can create a new account.
* A user can change its preferences: 
  * First name, last name, email and password.
  * Delete his/her account.
* A user can log in.
* A user can log out.
* An anonymous or a registered user can access list of trips where will be able to read basic information about trip.
* An anonymous or a registered user can access to /about page (not implemented yet).
* An anonymous or a registered user can access to /contact page (not implemented yet).
* An anonymous or a registered user can search for a trip by name and places, and a list will be shown with all the matches (search by places not implemented yet).
* A registered user can create a review about other user (not implemented yet).

## Domain
### User
* `id : String`
* `firstName: String`
* `lastName: String`
* `email: String`
* `password: String`
* `tripsHosted: Array<Trip>`
* `tripsAttended: Array<Trip>`
* `about: String`

### Trip
* `id : String`
* `title: String`
* `description: String`
* `startDate`
* `endDate`
* `places: Array`
* `participants: Array<User>`
* `photo: String (url)`

### Review
* `id : String`
* `text: String`
* `rating: Integer`
* `dateCreated: LocalDate `
* `user: User`
* `author: User`

## API endpoints

Public paths:
* `POST: /api/users/sign_in`
* `POST: /api/users/sign_up`
* `GET: /api/trips/searchName?=params` to search by title
* `GET: /api/trips/searchPlace?=params` to search by places
* `GET: /api/trips/` to retrieve all trips from database
* `GET: /api/trips/:id` to retrieve specific trip from database

Paths with auth:
* `GET: /api/users/:id` to retrieve specific user
* `PUT: /api/users/:id.` to edit user profile
* `DELETE: /api/users/:id` to delete user profile 
* `POST: /api/users/:id/review/new` to add review of user
* `PUT: /api/users/:id/review/:id` to edit review
* `DELETE: /api/users/:id/review/:id` to delete review
* `GET: /api/users/me` to retrive info about currently logged user
* `POST: /api/trips/create`
* `PUT: /api/trips/:id` to edit trip
* `DELETE: /api/trips/:id`

## Next steps
Write test.

package ch.tripsharing.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.tripsharing.domain.Role;

public interface RoleRepository extends JpaRepository<Role, String>{
	
	Role findByName(String name);
	
}

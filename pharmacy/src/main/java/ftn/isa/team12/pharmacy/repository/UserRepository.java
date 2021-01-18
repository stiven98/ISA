package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

}

package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.UUID;

public interface DermatologistRepository extends JpaRepository<Dermatologist, UUID> {

    Dermatologist findByLoginInfoEmail(String email);

    @Query("select p from Dermatologist p where p.userId= ?1")
    Dermatologist findDermatologistById(UUID id);
}

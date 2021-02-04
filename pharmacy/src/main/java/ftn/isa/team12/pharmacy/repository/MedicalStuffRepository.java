package ftn.isa.team12.pharmacy.repository;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface MedicalStuffRepository extends JpaRepository<MedicalStuff, UUID> {
    MedicalStuff findByUserId(UUID userId);
    MedicalStuff findByLoginInfoEmail(String email);
}

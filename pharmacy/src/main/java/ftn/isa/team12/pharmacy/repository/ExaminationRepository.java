package ftn.isa.team12.pharmacy.repository;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ExaminationRepository extends JpaRepository<Examination, UUID> {

    List<Examination> findAll();
    List<Examination> findAllByEmployee(MedicalStuff employee);
    List<Examination> findAllByEmployeeAndPharmacy(MedicalStuff employee, Pharmacy pharmacy);

}

package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugInPharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DrugInPharmacyRepository extends JpaRepository<DrugInPharmacy, UUID> {

    @Query("select d.drug from DrugInPharmacy d where d.pharmacy.id= ?1")
    List<Drug> findDrugInPharmacyById(UUID pharmacyId);
}

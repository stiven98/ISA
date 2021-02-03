package ftn.isa.team12.pharmacy.repository;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugInPharmacy;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.UUID;

public interface DrugInPharmacyRepository extends JpaRepository<DrugInPharmacy, UUID> {

    @Query("select d.drug from DrugInPharmacy d where d.pharmacy.id= ?1")
    List<Drug> findDrugInPharmacyById(UUID pharmacyId);

    @Query("select d.pharmacy from DrugInPharmacy d where d.drug.drugId= ?1")
    List<Pharmacy> findPharmaciesWithDrug(UUID drugId);

    @Query("select d from DrugInPharmacy d where d.drug.drugId= ?1 and d.pharmacy.id=?2")
    DrugInPharmacy findDrugInPharmacy(UUID drugId, UUID pharmacyId);

    List<DrugInPharmacy> findDrugInPharmacyByPharmacyId(UUID id);

}

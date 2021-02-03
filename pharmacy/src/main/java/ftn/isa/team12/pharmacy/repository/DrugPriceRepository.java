package ftn.isa.team12.pharmacy.repository;
import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.UUID;

public interface DrugPriceRepository extends JpaRepository<DrugPrice, UUID> {

    @Query("select d.price from DrugPrice d where d.pharmacy.id= ?1 and d.drug.drugId= ?2")
    double getPriceForDrug(UUID pharmacyId, UUID drugId);
}

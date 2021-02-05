package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.ERecipe;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.repository.ERecipeRepository;
import ftn.isa.team12.pharmacy.repository.PatientRepository;
import ftn.isa.team12.pharmacy.service.ERecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ERecipeServiceImpl implements ERecipeService {

    @Autowired
    private ERecipeRepository eRecipeRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<ERecipe> findAllERecipesByPatient(String email) {
        Patient patient = this.patientRepository.findByEmail(email);
        return eRecipeRepository.findAllERecipesByPatient(patient.getUserId());
    }
}

package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import java.util.List;

public interface ExaminationService {
    List<Examination> findAll();
    List<Examination> findAllByEmployee(MedicalStuff employee);
}

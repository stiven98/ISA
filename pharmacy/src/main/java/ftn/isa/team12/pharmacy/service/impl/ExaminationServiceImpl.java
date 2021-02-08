package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.common.WorkTime;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.dto.ExaminationScheduleMedStuffDTO;
import ftn.isa.team12.pharmacy.repository.ExaminationRepository;
import ftn.isa.team12.pharmacy.repository.WorkTimeRepository;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import ftn.isa.team12.pharmacy.service.MedicalStuffService;
import ftn.isa.team12.pharmacy.service.PatientService;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ExaminationServiceImpl implements ExaminationService {

    @Autowired
    ExaminationRepository examinationRepository;

    @Autowired
    MedicalStuffService medicalStuffService;

    @Autowired
    PatientService patientService;

    @Autowired
    PharmacyService pharmacyService;

    @Autowired
    WorkTimeRepository workTimeRepository;

    @Override
    public List<Examination> findAll() {
        return null;
    }

    @Override
    public List<Examination> findAllByEmployee(MedicalStuff employee) {
        return examinationRepository.findAllByEmployee(employee);
    }

    @Override
    public List<Examination> findAllByPatient(Patient patient) {
        return examinationRepository.findAllByPatient(patient);
    }

    @Override
    public List<Examination> findAllByEmployeeAndPharmacy(MedicalStuff employee, Pharmacy pharmacy) {
        return examinationRepository.findAllByEmployeeAndPharmacy(employee, pharmacy);
    }

    @Override
    public Examination findById(UUID id) {
        return examinationRepository.findExaminationByExaminationId(id);
    }

    @Override
    public Examination findCurrentById(UUID id) {
        Examination examination = examinationRepository.findExaminationByExaminationId(id);
        if(examination == null){
            return null;
        }else{
            Date today = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            boolean sameDate = sdf.format(today).equals(sdf.format(examination.getDateOfExamination()));
            if(!sameDate){
                return null;
            }
            LocalTime now = LocalTime.now();
            LocalTime start = examination.getTimeOfExamination();
            if(now.compareTo(start) < 0){
                return null;
            }
            LocalTime end = start.plusMinutes(examination.getDuration());
            if(now.compareTo(end) > 0){
                return null;
            }
            return examination;
        }
    }

    @Override
    public Examination scheduleNewMedStuff(ExaminationScheduleMedStuffDTO dto) {
        Date date = dto.getDate();
        LocalTime time = dto.getTime();
        MedicalStuff medicalStuff = medicalStuffService.findById(dto.getMedStuffId());
        Pharmacy pharmacy = pharmacyService.findPharmacyById(dto.getPharmacyId());
        Patient patient = patientService.findById(dto.getPatientId());
        WorkTime workTime = workTimeRepository.findByEmployeeAndPharmacyAndDate(medicalStuff, pharmacy, date);
        if(workTime == null){
            return null;
        }
        if(!checkWorkTimeOverlapping(workTime.getStartTime(), workTime.getEndTime(), time)){
            return null;
        }
        List<Examination> medStuffExaminations = findAllByEmployee(medicalStuff);
        List<Examination> patientExaminations = findAllByPatient(patient);
        for(Examination e : medStuffExaminations){
            if(checkIfTimeOverlapping(e.getTimeOfExamination(), e.getDateOfExamination(), dto.getTime(), dto.getDate())){
                return null;
            }
        }
        for(Examination e : patientExaminations){
            if(checkIfTimeOverlapping(e.getTimeOfExamination(), e.getDateOfExamination(), dto.getTime(), dto.getDate())){
                return null;
            }
        }
        Examination examination = new Examination();
        examination.setDateOfExamination(date);
        examination.setTimeOfExamination(time);
        examination.setDuration(45);
        examination.setEmployee(medicalStuff);
        examination.setPatient(patient);
        examination.setPharmacy(pharmacy);
        Examination saved = examinationRepository.save(examination);
        patient.getExaminations().add(saved);
        medicalStuff.getExaminations().add(saved);
        patientService.saveAndFlush(patient);
        medicalStuffService.saveAndFlush(medicalStuff);
        return saved;
    }

    private boolean checkWorkTimeOverlapping(LocalTime workTimeStart, LocalTime workTimeEnd, LocalTime newExaminationTime){
        LocalTime newExaminationEnd = newExaminationTime.plusMinutes(45);
        if (newExaminationTime.compareTo(workTimeStart) < 0 || newExaminationEnd.compareTo(workTimeEnd) > 0) {
            return false;
        }
        return true;
    }

    private boolean checkIfTimeOverlapping(LocalTime examinationTime, Date examinationDate, LocalTime newTime, Date newDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        boolean sameDate = sdf.format(examinationDate).equals(sdf.format(newDate));
        if (!sameDate) {
            return false;
        }
        LocalTime examinationEnd = examinationTime.plusMinutes(45);
        LocalTime newEnd = newTime.plusMinutes(45);
        if (newTime.compareTo(examinationTime) >= 0 && newTime.compareTo(examinationEnd) <= 0) {
            return true;
        }
        if (newEnd.compareTo(examinationTime) >= 0 && newEnd.compareTo(examinationEnd) <= 0) {
            return true;
        }
        return false;
    }
    @Override
    public List<Pharmacy> findAllPharmaciesWherePatientHadExamination(UUID patientId) {
        return this.examinationRepository.findAllPharmaciesWherePatientHadExamination(patientId);
    }

    @Override
    public List<MedicalStuff> findAllMedicalStuffThatTreatedPatient(UUID patientId) {
        return this.examinationRepository.findAllMedicalStuffThatTreatedPatient(patientId);
    }

    @Override
    public List<Pharmacy> findPharmaciesWithFreeTerm(Date date, LocalTime time) {
        return this.examinationRepository.findPharmaciesWithFreeTerm(date, time);
    }

}

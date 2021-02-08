package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.common.WorkTime;
import ftn.isa.team12.pharmacy.domain.enums.ExaminationType;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.BusyDateDTO;
import ftn.isa.team12.pharmacy.dto.ExaminationCreateDTO;
import ftn.isa.team12.pharmacy.dto.ExaminationScheduleMedStuffDTO;
import ftn.isa.team12.pharmacy.repository.ExaminationPriceRepository;
import ftn.isa.team12.pharmacy.repository.ExaminationRepository;
import ftn.isa.team12.pharmacy.repository.WorkTimeRepository;
import ftn.isa.team12.pharmacy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;



@Service
public class ExaminationServiceImpl implements ExaminationService {

    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    private WorkTimeRepository workTimeRepository;

    @Autowired
    private DermatologistService dermatologistService;

    @Autowired
    private ExaminationPriceRepository examinationPriceRepository;

    @Autowired
    MedicalStuffService medicalStuffService;

    @Autowired
    PatientService patientService;

    @Autowired
    PharmacyService pharmacyService;


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
    public Examination addExaminationForDermatologist(ExaminationCreateDTO dto) {
        this.checkExamination(dto);
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Dermatologist dermatologist = dermatologistService.findByEmail(dto.getEmail());
        ExaminationPrice examinationPrice = examinationPriceRepository.findByExaminationPriceId(dto.getPriceId());

        //setovati cenu

        Examination examination = new Examination();
        examination.setDuration(dto.getDuration());
        examination.setDateOfExamination(dto.getDate());
        examination.setTimeOfExamination(dto.getStartTime());
        examination.setPatient(null);
        examination.setExaminationType(ExaminationType.dermatologistExamination);
        examination.setPharmacy(pharmacyAdministrator.getPharmacy());
        examination.setEmployee(dermatologist);
        examination.setExaminationPrice(examinationPrice);

        return examinationRepository.save(examination);
    }

    @Override
    public BusyDateDTO busyTime(String email, Date date) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Dermatologist dermatologist = dermatologistService.findByEmail(email);
        WorkTime work = workTimeRepository.findByEmployeeAndPharmacyAndDate(dermatologist,pharmacyAdministrator.getPharmacy(),date);
        BusyDateDTO busyDateDTO = new BusyDateDTO();
        if(work == null){
            throw new IllegalArgumentException("Dermatologist don't work on " + date.toString());
        }

        busyDateDTO.setStart(work.getStartTime());
        busyDateDTO.setEnd(work.getEndTime());

        if(dermatologist == null || pharmacyAdministrator == null)
            throw new IllegalArgumentException("Bad input");


        for (Examination ex: examinationRepository.findAllByEmployeeAndPharmacyAndDateOfExamination(dermatologist,pharmacyAdministrator.getPharmacy(),date)){
                BusyDateDTO b = new BusyDateDTO();
                b.setStart(ex.getTimeOfExamination());
                b.setEnd(ex.getTimeOfExamination().plusMinutes(ex.getDuration()));
                busyDateDTO.getBusyDateDTOS().add(b);
        }


        return busyDateDTO;
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
        ExaminationType examinationType = dto.getType();
        Examination examination = new Examination();
        examination.setDateOfExamination(date);
        examination.setTimeOfExamination(time);
        examination.setDuration(45);
        examination.setExaminationType(examinationType);
        examination.setEmployee(medicalStuff);
        examination.setPatient(patient);
        examination.setPharmacy(pharmacy);
        List<ExaminationPrice> prices = examinationPriceRepository.findLatestByPharmacy(pharmacy, date, examinationType);
        if(prices != null && !prices.isEmpty()){
            ExaminationPrice examinationPrice = prices.get(0);
            examination.setExaminationPrice(examinationPrice);
        }
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


    @Override
    public void checkExamination(ExaminationCreateDTO dto) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Dermatologist dermatologist = dermatologistService.findByEmail(dto.getEmail());
        WorkTime workTime = workTimeRepository.findByEmployeeAndPharmacyAndDate(dermatologist, pharmacyAdministrator.getPharmacy(), dto.getDate());

        //proveriti da li je na odmoru

        if(dermatologist == null || pharmacyAdministrator == null)
            throw new IllegalArgumentException("Bad input");

        boolean flag = false;

        for (Pharmacy p : dermatologist.getPharmacies()){
            if(p.getId().toString().equals(pharmacyAdministrator.getPharmacy().getId().toString())) {
                flag = true;
                break;
            }
        }

        if(!flag)
            throw new IllegalArgumentException("No dermatologist in this pharmacy " + pharmacyAdministrator.getPharmacy().getName());



        if(workTime == null)
            throw new IllegalArgumentException("Dermatologist dosen't work on: " + dto.getDate().toString());

        List<Examination> examinations = examinationRepository.findAllByEmployeeAndPharmacyAndDateOfExamination(dermatologist,pharmacyAdministrator.getPharmacy(),dto.getDate());
        for(Examination examination: examinations){
            int hourExamination = examination.getTimeOfExamination().getHour();
            int minuteExamination = examination.getTimeOfExamination().getMinute();
            int hourNewExamination = dto.getStartTime().getHour();
            int minuteNewExamination = dto.getStartTime().getMinute();

            if(hourNewExamination == hourExamination && (minuteExamination + examination.getDuration()) >= minuteNewExamination)
                throw new IllegalArgumentException("Time is overlap 1");

            if(hourNewExamination< workTime.getStartTime().getHour())
                throw new IllegalArgumentException("Work time start in " + workTime.getStartTime().toString());

            if( (hourNewExamination < hourExamination) && dto.getStartTime().plusMinutes(dto.getDuration()).compareTo(examination.getTimeOfExamination()) > 0)
                throw new IllegalArgumentException("Time is overlap 2");

            if(dto.getStartTime().compareTo(examination.getTimeOfExamination()) == 0)
                throw new IllegalArgumentException("Time is busy");
        }

    }
}

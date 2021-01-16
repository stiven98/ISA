package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.common.WorkTime;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "MEDICAL_STUFF")
public abstract class MedicalStuff extends User implements Serializable {

   @Column(name = "AVERAGEMARK")
   private Double averageMark;
   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "employee")
   private Set<WorkTime> workTime = new HashSet<WorkTime>();
   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "employee")
   private Set<Examination> examinations = new HashSet<Examination>();
   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "employee")
   private Set<Vacation> vacations = new HashSet<Vacation>();


}
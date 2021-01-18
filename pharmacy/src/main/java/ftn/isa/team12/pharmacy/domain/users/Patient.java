package ftn.isa.team12.pharmacy.domain.users;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.scheduling.annotation.Scheduled;

import javax.persistence.*;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Entity
@Table(name = "PATIENTS")
public class Patient extends User implements Serializable {
    @ManyToMany
    @JoinTable(name = "allergies", joinColumns = @JoinColumn(name="user_id" ,  referencedColumnName  = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "drug_id", referencedColumnName = "drug_id"))
    private Set<Drug> allergies = new HashSet<Drug>();

    //@Scheduled(cron = "")
    @Column(name = "penalties")
    private int penalties;

    @Embedded
    private AccountCategory category;
    @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "patient")
    private Set<Examination> examinations = new HashSet<Examination>();
}
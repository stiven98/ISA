package ftn.isa.team12.pharmacy.domain.users;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "PHARMACISTS")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Pharmacist extends User implements Serializable {

}
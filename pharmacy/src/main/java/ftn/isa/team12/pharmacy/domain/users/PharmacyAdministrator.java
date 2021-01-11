package ftn.isa.team12.pharmacy.domain.users;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "PHARMACYADMINISTRATORS")
public class PharmacyAdministrator extends User implements Serializable {

}
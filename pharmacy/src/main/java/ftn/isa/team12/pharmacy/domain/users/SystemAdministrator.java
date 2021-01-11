package ftn.isa.team12.pharmacy.domain.users;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "SYSTEMADMINISTRATORS")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class SystemAdministrator extends User implements Serializable {

}
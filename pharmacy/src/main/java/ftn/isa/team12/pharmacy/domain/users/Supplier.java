package ftn.isa.team12.pharmacy.domain.users;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "SUPPLIERS")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Supplier extends User implements Serializable {

}
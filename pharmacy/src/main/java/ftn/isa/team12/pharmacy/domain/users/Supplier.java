package ftn.isa.team12.pharmacy.domain.users;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "SUPPLIERS")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Supplier extends User implements Serializable {

}
package ftn.isa.team12.pharmacy.domain.common;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;


@Entity
@Table(name = "COUNTRIES")
@Getter
@Setter
@NoArgsConstructor
public class Country implements Serializable {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "country_id", nullable = false, unique = true)
   public UUID countryId;

   @Column(name = "name", nullable = false, unique = false)
   public String name;

   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "country")
   private Set<City> cities = new HashSet<City>();

}
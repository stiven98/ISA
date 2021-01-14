package ftn.isa.team12.pharmacy.domain.common;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;


@Entity
@Table(name="CITIES")
public class City implements Serializable {
   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "city_id", nullable = false, unique = true)
   private UUID cityId;

   @Column(name = "name", nullable = false, unique=false)
   private String name;

   @Column(name = "zip_code", nullable = false, unique = false)
   private int zipCode;

   @ManyToOne
   @Id
   @JoinColumn(name = "country_id", referencedColumnName = "country_id", nullable = false)
   private Country country;

   public City() { }

   public UUID getCityId() {
      return cityId;
   }

   public void setCityId(UUID cityId) {
      this.cityId = cityId;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public int getZipCode() {
      return zipCode;
   }

   public void setZipCode(int zipCode) {
      this.zipCode = zipCode;
   }

   public Country getCountry() {
      return country;
   }

   public void setCountry(Country country) {
      this.country = country;
   }

}
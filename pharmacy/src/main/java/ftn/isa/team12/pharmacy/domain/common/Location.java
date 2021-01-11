package ftn.isa.team12.pharmacy.domain.common;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "LOCATIONS")
public class Location {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "LOCATION_ID", nullable = false, unique = true)
   private UUID locationId;

   @ManyToOne
   @JoinColumns({@JoinColumn(name = "COUNTRY_ID", referencedColumnName = "COUNTRY_ID", nullable = false, unique = false),
           @JoinColumn(name = "CITY_ID", referencedColumnName = "CITY_ID", nullable = false, unique = false)})
   private City city;

   @Embedded
   private Address address;

   public Location() { }

   public UUID getLocationId() {
      return locationId;
   }

   public void setLocationId(UUID locationId) {
      this.locationId = locationId;
   }

   public City getCity() {
      return city;
   }

   public void setCity(City city) {
      this.city = city;
   }

   public Address getAddress() {
      return address;
   }

   public void setAddress(Address address) {
      this.address = address;
   }
}
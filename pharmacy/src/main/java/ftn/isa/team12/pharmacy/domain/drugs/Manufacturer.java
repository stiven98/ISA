package ftn.isa.team12.pharmacy.domain.drugs;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "MANUFACTURER")
public class Manufacturer implements Serializable {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "manufacturer_id", nullable = false, unique = true)
   private UUID manufacturerId;

   @Column(name = "name", nullable = false, unique = true)
   private String name;

   public UUID getManufacturerId() {
      return manufacturerId;
   }

   public void setManufacturerId(UUID manufacturerId) {
      this.manufacturerId = manufacturerId;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }
}
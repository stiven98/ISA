package ftn.isa.team12.pharmacy.domain.common;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class Address implements Serializable {

   @Column(name = "street", nullable = false)
   private String street;

   @Column(name = "number", nullable = false)
   private int number;

   public String getStreet() {
      return street;
   }

   public void setStreet(String street) {
      this.street = street;
   }


   public int getNumber() {
      return number;
   }

   public void setNumber(int number) {
      this.number = number;
   }

   public Address() {
   }
}
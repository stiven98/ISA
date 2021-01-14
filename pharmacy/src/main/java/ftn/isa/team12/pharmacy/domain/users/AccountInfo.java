package ftn.isa.team12.pharmacy.domain.users;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class AccountInfo implements Serializable {

   @Column(name = "name", nullable = false)
   private String name;

   @Column(name = "lastname", nullable = false)
   private String lastName;

   @Column(name = "phonenumber", nullable = false)
   private String phoneNumber;

   @Column(name = "active", nullable = false)
   private boolean active;

   @Column(name = "firstlogin", nullable = false)
   private boolean isFirstLogin;

   public AccountInfo() { }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getLastName() {
      return lastName;
   }

   public void setLastName(String lastName) {
      this.lastName = lastName;
   }

   public String getPhoneNumber() {
      return phoneNumber;
   }

   public void setPhoneNumber(String phoneNumber) {
      this.phoneNumber = phoneNumber;
   }

   public boolean isActive() {
      return active;
   }

   public void setActive(boolean active) {
      this.active = active;
   }

   public boolean isFirstLogin() {
      return isFirstLogin;
   }

   public void setFirstLogin(boolean firstLogin) {
      isFirstLogin = firstLogin;
   }
}
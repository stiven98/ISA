package ftn.isa.team12.pharmacy.domain.users;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class AccountInfo implements Serializable {

   @Column(name = "NAME", nullable = false)
   private String name;

   @Column(name = "LASTNAME", nullable = false)
   private String lastName;

   @Column(name = "PHONENUMBER", nullable = false)
   private String phoneNumber;

   @Column(name = "ACTIVE", nullable = false)
   private boolean active;

   @Column(name = "FIRSTLOGIN", nullable = false)
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
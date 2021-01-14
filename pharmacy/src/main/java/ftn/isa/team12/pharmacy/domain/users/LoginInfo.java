package ftn.isa.team12.pharmacy.domain.users;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.*;

@Embeddable
public class LoginInfo implements Serializable {

   @Column(name = "email", nullable = false, unique = true)
   private String email;

   @Column(name = "password", nullable = false)
   private String password;

   public LoginInfo() { }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getPassword() {
      return password;
   }

   public void setPassword(String password) {
      this.password = password;
   }
}
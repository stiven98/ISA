package ftn.isa.team12.pharmacy.domain.users;
import ftn.isa.team12.pharmacy.domain.common.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;


@MappedSuperclass
public abstract class User implements Serializable {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "USER_ID", nullable = false, unique = true)
   private UUID userId;

   @Embedded
   private LoginInfo loginInfo;

   @OneToOne
   @JoinColumn(name = "LOCATION_ID", referencedColumnName = "LOCATION_ID", nullable = false, unique = false)
   private Location location;

   @Embedded
   private AccountInfo accountInfo;

   public UUID getUserId() {
      return userId;
   }

   public void setUserId(UUID userId) {
      this.userId = userId;
   }

   public LoginInfo getLoginInfo() {
      return loginInfo;
   }

   public void setLoginInfo(LoginInfo loginInfo) {
      this.loginInfo = loginInfo;
   }

   public Location getLocation() {
      return location;
   }

   public void setLocation(Location location) {
      this.location = location;
   }

   public AccountInfo getAccountInfo() {
      return accountInfo;
   }

   public void setAccountInfo(AccountInfo accountInfo) {
      this.accountInfo = accountInfo;
   }
}
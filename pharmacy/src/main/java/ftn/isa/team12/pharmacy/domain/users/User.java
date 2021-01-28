package ftn.isa.team12.pharmacy.domain.users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import ftn.isa.team12.pharmacy.domain.common.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "USERS")
public abstract class User implements Serializable, UserDetails {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "user_id", nullable = false, unique = true)
   private UUID userId;

   @Embedded
   private LoginInfo loginInfo;

   @OneToOne
   @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false, unique = false)
   private Location location;

   @Embedded
   private AccountInfo accountInfo;

   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(name = "user_authority",
           joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
           inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
   private List<Authority> authorities = new ArrayList<Authority>() {
   };

   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
      return this.authorities;
   }

   @Override
   public String getPassword() {
      return this.loginInfo.getPassword();
   }

   @Override
   public String getUsername() {
      return this.loginInfo.getEmail();
   }

   @JsonIgnore
   @Override
   public boolean isAccountNonExpired() {
      return true;
   }

   @JsonIgnore
   @Override
   public boolean isAccountNonLocked() {
      return true;
   }

   @JsonIgnore
   @Override
   public boolean isCredentialsNonExpired() {
      return true;
   }

   @Override
   public boolean isEnabled() {
      return accountInfo.isActive();
   }
}
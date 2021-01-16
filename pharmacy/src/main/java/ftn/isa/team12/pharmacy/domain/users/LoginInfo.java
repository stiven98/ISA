package ftn.isa.team12.pharmacy.domain.users;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.*;
@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class LoginInfo implements Serializable {

   @Column(name = "email", nullable = false, unique = true)
   private String email;

   @Column(name = "password", nullable = false)
   private String password;


}
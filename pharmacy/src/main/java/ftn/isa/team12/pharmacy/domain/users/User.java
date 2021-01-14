package ftn.isa.team12.pharmacy.domain.users;
import ftn.isa.team12.pharmacy.domain.common.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public abstract class User implements Serializable {

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
}
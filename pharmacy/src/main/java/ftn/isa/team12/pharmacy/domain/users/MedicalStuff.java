package ftn.isa.team12.pharmacy.domain.users;

import javax.persistence.*;
import java.io.Serializable;

@MappedSuperclass
public abstract class MedicalStuff extends User implements Serializable {

   @Column(name = "AVERAGEMARK")
   private Double averageMark;

   public Double getAverageMark() {
      return averageMark;
   }

   public void setAverageMark(Double averageMark) {
      this.averageMark = averageMark;
   }
}
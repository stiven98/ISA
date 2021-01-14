package ftn.isa.team12.pharmacy.domain.examination;

import ftn.isa.team12.pharmacy.domain.common.DateRange;

import java.util.UUID;

public class ExaminationPrice {
   private UUID id;
   private Long amount;
   private UUID examinationTypeId;
   private UUID pharmacyId;
   private DateRange dateRange;

}
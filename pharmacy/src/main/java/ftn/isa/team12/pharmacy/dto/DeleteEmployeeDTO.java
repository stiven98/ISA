package ftn.isa.team12.pharmacy.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeleteEmployeeDTO {
    private String phAdminEmail;
    private String employeeEmail;

}

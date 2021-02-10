package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.dto.DeleteEmployeeDTO;
import ftn.isa.team12.pharmacy.dto.ReportsAverageMarksDTO;
import ftn.isa.team12.pharmacy.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/report", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportsController {

    @Autowired
    ReportService reportService;



    @PreAuthorize("hasAnyRole('ROLE_PH_ADMIN')")
    @GetMapping("/marks")
    public ResponseEntity<?> reportMark() {
        Map<String, String> result = new HashMap<>();
        ReportsAverageMarksDTO reportsAverageMarksDTO = reportService.averageMarks();
        if(reportsAverageMarksDTO == null) {
            result.put("result","Can't count average mark");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(reportsAverageMarksDTO, HttpStatus.OK);
    }

}

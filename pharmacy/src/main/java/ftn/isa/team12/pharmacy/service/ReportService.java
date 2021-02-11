package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.dto.ReportsAverageMarksDTO;
import ftn.isa.team12.pharmacy.dto.ReportsMonthlyDTO;

import java.text.ParseException;
import java.util.List;

public interface ReportService {


    ReportsAverageMarksDTO averageMarks();


    List<Integer> yearsReportsExamination() throws ParseException;

    ReportsMonthlyDTO monthlyReportExamination(Integer month);

}

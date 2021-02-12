import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addHours, addMinutes, endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ExaminationService } from '../services/examination.service';
import { MedicalStuffService } from '../services/medical-stuff.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

interface ExaminationView{
  examinationId : string;
  patientName : string;
  examinationDate: string;
  startTime: string;
  endTime: string;
  pharmacyName: string;
  pharmacyMark: number;
}

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    examination: ExaminationView;
  };

  refresh: Subject<any> = new Subject();

  eventMaxId = 0;

  events: CalendarEvent[] = [];

  workCalendarVisibility = false;

  examinations: any[];

  vacations: any[];

  inputsValid = false;

  examinationViews = [];

  selectedPharmacyName : string;

  examinationPage = "";

  selectedPharmacy: any;

  pharmacies = [];


  activeDayIsOpen: boolean = true;
  constructor(private auth : AuthService, private modal: NgbModal, private examinationServ : ExaminationService, private medStuffServ: MedicalStuffService) {}
  
  isDermatologist = (this.auth.getRole() === 'ROLE_DERMATOLOGIST');

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, calEvent: CalendarEvent): void {
    if(calEvent.id < this.eventMaxId){
      let examination = this.examinationViews[calEvent.id];
      this.examinationPage = "/examination/"+ examination.examinationId;
      console.log(this.examinationPage);
      this.modalData = { examination, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  showWorkCalendar(){
    this.getData(this.selectedPharmacy.id);
    this.workCalendarVisibility = true;
  }
  onChange(event){
    this.inputsValid = false;
    this.selectedPharmacyName = event.target.value.toString();
    for (let pharmacy of this.pharmacies) {
      if ( this.selectedPharmacyName === pharmacy.name) {
        this.selectedPharmacy = pharmacy;
        this.inputsValid = true;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.isDermatologist = (this.auth.getRole() === 'ROLE_DERMATOLOGIST');
    this.medStuffServ.getMyPharmacies().subscribe(res =>{
      this.pharmacies = res;
      if(!this.isDermatologist){
        if(this.pharmacies.length > 0){
          this.selectedPharmacy = this.pharmacies[0];
          this.showWorkCalendar();
        }
      }
    });
  }

  getData(id){
    this.examinationServ.getAllByEmployeeAndPharmacy(id).subscribe(res =>{
      this.examinations = res;
      let i = 0;
      let exams = [];
      for (let exam of this.examinations){
        let dateOfExamination = startOfDay(new Date(exam.dateOfExamination));
        let startHour = exam.timeOfExamination[0];
        let startMinutes = exam.timeOfExamination[1];
        let startTime = addMinutes(addHours(dateOfExamination, startHour), startMinutes);
        let endTime = addMinutes(startTime, exam.duration);
        let patientName = '';
        if(exam.patient){
          patientName = exam.patient.accountInfo.name + ' ' + exam.patient.accountInfo.lastName;
        }
        let event = {
          id: i,
          start: startTime,
          end: endTime,
          title: patientName + '\'s examination',
          color: colors.blue,
          allDay: false,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          },
          draggable: false,
        };
        exams.push(event);
        
        let pharmacy = exam.pharmacy;
        let viewExam = {
          examinationId: exam.examinationId,
          patientName : patientName,
          examinationDate: dateOfExamination.toLocaleDateString(),
          startTime: startTime.toLocaleTimeString(),
          endTime: endTime.toLocaleTimeString(),
          pharmacyName: pharmacy.name,
          pharmacyMark: pharmacy.averageMark,
        }
        this.examinationViews.push(viewExam);
        i++;
      }
      this.eventMaxId = i;
      i = -1;
      this.medStuffServ.getMyVacationsByPharmacy(id).subscribe(res => {
        this.vacations = res;
        for (let vac of this.vacations){
          i++;
          let event = {
            id: this.eventMaxId + i,
            start: startOfDay(new Date(vac.dateRange.startDate)),
            end: endOfDay(new Date(vac.dateRange.endDate)),
            title: 'Vacation ' + i,
            color: colors.red,
            allDay: true,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
          };
          exams.push(event);
        }
        this.events = exams;
      });
    });
  }

}

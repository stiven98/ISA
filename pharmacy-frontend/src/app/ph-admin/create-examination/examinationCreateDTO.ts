export class ExaminationCreateModel {
    email:String;
    date:Date;
    startTime;
    duration:number;
    priceId;
    
    


    constructor() {
        this.date = new Date();
        this.startTime = null;
        this.email ='';
        this.duration = 0;
        this.priceId = null;
    }
  }

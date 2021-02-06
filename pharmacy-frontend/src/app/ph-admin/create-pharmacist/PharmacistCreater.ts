import { ChangeUserModel } from "../../change-account-info/changeUser.model";
import { WorkTimeModel } from "./WorkTime";

export class PharmacistCreateModel {
    user:ChangeUserModel;
    emailPhAdmin:String;
    workTimes:WorkTimeModel[];


    constructor() {
        this.user = new ChangeUserModel();
        this.emailPhAdmin = '';
        this.workTimes = [];
      
    }
  }

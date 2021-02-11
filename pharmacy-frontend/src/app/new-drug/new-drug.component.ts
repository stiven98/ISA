import { Component, OnInit } from '@angular/core';
import {DrugValidation} from '../validation-model/drug-validation';
import {DrugModel} from './drug.model';
import {DrugService} from '../services/drug.service';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-drug',
  templateUrl: './new-drug.component.html',
  styleUrls: ['./new-drug.component.css']
})
export class NewDrugComponent implements OnInit {

  sendDate: boolean;
  fetchDrugs: boolean;
  fetchContradiction: boolean;
  fetchIngredient: boolean;
  drugValidation: DrugValidation;
  drugModel: DrugModel;
  typesOfDrug: string [];
  formsOfDrug: string [];
  drugs: any [];
  showDrugs: any [];
  showSubstituteDrugs: any [];
  showContraindication: any [];
  showAddContraindication: any [];
  showAddIngredients: any [];
  ingredients: any [];
  showIngredients: any [];
  substituteDrug: string;
  manufacturers: any [];
  contraindication: any [];
  selectedContraindication: string;
  newContraindication: string;
  selectedIngredient: string;
  newIngredient: string;
  fetchManufacturer: boolean;


  constructor(private drugService: DrugService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {

    this.drugValidation = new DrugValidation();
    this.drugModel = new DrugModel();
    this.typesOfDrug = ['HerbalMedicine', 'Antibiotic', 'Anesthetic', 'Antihistamine'];
    this.formsOfDrug = [ 'Powder', 'Capsule', 'Pill', 'Cream', 'Paste', 'Gel', 'Syrup'];
    this.drugs = [];
    this.showDrugs = [];
    this.showSubstituteDrugs = [];
    this.showContraindication = [];
    this.showAddContraindication = [];
    this.showAddIngredients = [];
    this.ingredients = [];
    this.showIngredients = [];

    this.substituteDrug = 'Choose...';
    this.manufacturers = [];
    this.contraindication = [];
    this.selectedContraindication = '';
    this.newContraindication = '';
    this.selectedIngredient = 'Choose...';
    this.newIngredient = '';

    this.sendDate = false;
    this.fetchDrugs = true;
    this.fetchContradiction = true;
    this.fetchIngredient = true;
    this.fetchManufacturer = true;

    this.userService.getMyInfo().subscribe(user => {
      if (this.authService.getRole() === 'ROLE_SYSTEM_ADMINISTRATOR') {
        this.drugService.findAll().subscribe((response) => {
          this.drugs = response;
          this.showDrugs = response;
          this.fetchDrugs = false;
        });

        this.drugService.findAllContraindications().subscribe((response) => {
          this.contraindication = response;
          this.showContraindication = response;
          this.fetchContradiction = false;
        });

        this.drugService.findAllIngredients().subscribe((response) => {
          this.ingredients = response;
          this.showIngredients = response;
          this.fetchIngredient = false;
        });

        this.drugService.findAllManufacturers().subscribe((response) => {
          this.manufacturers = response;
          this.fetchManufacturer = false;
        });
      } else {
        this.router.navigate(['403']);
      }
    }, () => {
      this.router.navigate(['/login']);
    });



  }

  createDrug = () => {
    if (this.isValidInput()) {
      this.drugService.addDrug(this.drugModel).subscribe(() => {
        alert('Drug added!');
        this.ngOnInit();
      });
    }

  }

  isValidInput = () => {
    const validatedName = this.drugValidation.isValidName(this.drugModel.name);
    const validatedCode = this.drugValidation.isValidCode(this.drugModel.code);
    const validatedPoints = this.drugValidation.isValidPoints(this.drugModel.points);
    const validatedTypeOfDrug = this.drugValidation.isValidTypeOfDrug(this.drugModel.typeOfDrug);
    const validatedFormOfDrug = this.drugValidation.isValidFormOfDrug(this.drugModel.formOfDrug);
    const validatedNote = this.drugValidation.isValidNote(this.drugModel.note);
    const validatedDailyDose = this.drugValidation.isValidDailyDose(this.drugModel.dailyDose);
    const validStatus = this.drugValidation.isValidStatus(this.drugModel.issuanceRegime);
    const validManufacturer = this.drugValidation.isValidManufacturer(this.drugModel.manufacturer);

    return validatedName && validatedCode && validatedPoints && validatedTypeOfDrug && validatedFormOfDrug &&
      validatedNote && validatedDailyDose && validStatus && validManufacturer;
  }


  onChangeManufacturer = (event) => {
    this.drugModel.manufacturer = event.target.value;
    this.drugValidation = new DrugValidation();
  }


  deleteIngredient = (id: string) => {
    this.showAddIngredients = this.showAddIngredients.filter((item) => {
      if (id !== item.ingredientId) {
        return item;
      }
    });

    this.drugModel.ingredients = this.drugModel.ingredients.filter((item) => {
      if (item !== id) {
        return item;
      }
    });
    this.refreshIngredient();
  }

  addIngredient = () => {
    if (this.selectedIngredient === 'Choose...') {
      this.drugValidation.validIngredient = 'is-invalid';
      return;
    }
    this.pushIngredient(this.selectedIngredient);
    this.refreshIngredient();

  }

  addNewIngredient = () => {
    if (this.newIngredient.match(new RegExp('[A-Za-z ]+'))) {
      this.drugService.addIngredient({name: this.newIngredient}).subscribe((response) => {
        this.newIngredient = '';
        this.selectedIngredient = 'Choose...';
        this.fetchIngredient = true;
        this.drugService.findAllIngredients().subscribe((responseData) => {
          this.ingredients = responseData;
          this.refreshIngredient();
          this.fetchIngredient = false;

        }, error => {
          this.drugValidation.validNewIngredient = 'is-invalid';
        });
      });

    } else {
      this.drugValidation.validIngredient = 'is-invalid';
    }

  }

  pushIngredient = (id) => {
    for (const item of this.ingredients) {
      if (item.ingredientId === id) {
        this.drugModel.ingredients.push(item.ingredientId);
        this.showAddIngredients.push(item);
        this.selectedIngredient = 'Choose...';
        return;
      }
    }
  }

  refreshIngredient = () => {
    this.showIngredients = this.ingredients.filter((item) => {
      if (!this.drugModel.ingredients.includes(item.ingredientId)) {
        return item;
      }
    });
  }

  onChangeIngredient = (event) => {
    this.selectedIngredient = event.target.value;
  }

  deleteContraindication = (id: string) => {
    this.showAddContraindication = this.showAddContraindication.filter((item) => {
      if (id !== item.contraindicationId) {
        return item;
      }
    });

    this.drugModel.contraindication = this.drugModel.contraindication.filter((item) => {
      if (item !== id) {
        return item;
      }
    });
    this.refreshContraindication();
  }

  addContradiction = () => {
    if (this.selectedContraindication === 'Choose...') {
      this.drugValidation.validContraindication = 'is-invalid';
      return;
    }
    this.pushContraindication(this.selectedContraindication);
    this.refreshContraindication();
  }

  refreshContraindication = () =>  {
    this.showContraindication = this.contraindication.filter((item) => {
      if (!this.drugModel.contraindication.includes(item.contraindicationId) ){
        return item;
      }
    });

  }

  pushContraindication = (id: string) => {
    for (const item of this.contraindication) {
      if (item.contraindicationId === id) {
        this.drugModel.contraindication.push(item.contraindicationId);
        this.showAddContraindication.push(item);
        this.selectedContraindication = 'Choose...';
        return;
      }
    }
  }

  onChangeContraindication = (event) => {
    this.selectedContraindication = event.target.value;

  }

  addNewContraindication = () => {
    if (this.newContraindication.match(new RegExp('[A-Za-z ]+'))) {
      this.drugService.addContraindication({name: this.newContraindication}).subscribe((response) => {
        this.newContraindication = '';
        this.selectedContraindication = 'Choose...';
        this.fetchContradiction = true;
        this.drugService.findAllContraindications().subscribe((responseData) => {
          this.contraindication = responseData;
          this.refreshContraindication();
          this.fetchContradiction = false;

        }, error => {
          this.drugValidation.validNewContraindication = 'is-invalid';
        });
      });

    } else {
      this.drugValidation.validNewContraindication = 'is-invalid';
    }
  }

  deleteSubstituteDrug = (id) => {

    this.showSubstituteDrugs = this.showSubstituteDrugs.filter((item) => {
      if (id !== item.id) {
        return item;
      }
    });

    this.drugModel.substituteDrug = this.drugModel.substituteDrug.filter((item) => {
      if (item !== id) {
        return item;
      }
    });
    this.refreshDrugs();
  }

  addSubstitute = () => {
    if (this.substituteDrug === 'Choose...') {
      this.drugValidation.validSubstituteDrug = 'is-invalid';
      return;
    }
    this.pushDrug(this.substituteDrug);
    this.refreshDrugs();
  }

  refreshDrugs = () => {
    this.showDrugs = this.drugs.filter((item) => {
      if (!this.drugModel.substituteDrug.includes(item.id) ){
        return item;
      }
    });
  }

  pushDrug = (id: string) => {
    for (const item of this.drugs) {
      if (item.id === id) {
        this.drugModel.substituteDrug.push(item.id);
        this.showSubstituteDrugs.push(item);
        this.substituteDrug = 'Choose...';
        return;
      }
    }
  }

  onChangeTypeOfDrug = (event) => {
    this.drugModel.typeOfDrug = event.target.value;
    this.drugValidation = new DrugValidation();
  }

  onChangeFormOfDrug = (event) => {
    this.drugModel.formOfDrug = event.target.value;
    this.drugValidation = new DrugValidation();
  }

  onChangeSubstituteDrug = (event) => {
    this.substituteDrug = event.target.value;
    this.drugValidation = new DrugValidation();
  }

  onKeyDown = () => {
    this.drugValidation = new DrugValidation();
  }



  onChangeIssuanceRegime = (event) => {
    this.drugModel.issuanceRegime = event.target.value;
    this.drugValidation = new DrugValidation();
  }
}

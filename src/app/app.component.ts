import { Component, OnInit, VERSION } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface legalGroupsInteface {
  casconnectID?: string;
  legalEntityarr?: any[];
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  legalGroups!: FormGroup;

  legalGroupInterface: legalGroupsInteface = {};
  userData: any = {};
  formDataFromApi!: any;
  isEdit = false;

  newIndex!: any;
  newformLength!: any;

  apiData: any = [
    {
      caseconnectID: 'CaConnectid_1',
      legalEntityarr: [
        {
          fullname: 'Thalapati Vijay',
          email: 'Thalapati Vijay',
          contact: 123123123123,
        },
        {
          fullname: 'Jr NTR',
          email: 'Jr NTR',
          contact: 1231234345,
        },
      ],
    },
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.legalGroupInterface.casconnectID = 'CaConnectid_1';
    if (this.apiData.length > 0) {
      this.legalGroupInterface.legalEntityarr = this.apiData.map(
        (el) => el.legalEntityarr
      );
      this.legalGroupInterface.legalEntityarr.map(
        (el) => (this.formDataFromApi = el)
      );
    }
    this.legalGroups = this.formBuilder.group({
      legalEntity: this.formBuilder.array(
        this.formDataFromApi.map((el) => {
          return new FormGroup({
            name: new FormControl(el.fullname),
            email: new FormControl(el.email),
            contact: new FormControl(el.contact),
          });
        })
      ),
      newlegalEntity: this.formBuilder.array([this.createLegalFormGroup()]),
    });

    this.userData = {
      username: 'demoUsername',
    };

    this.getallFormIndex();
  }

  //creating by default new form
  private createLegalFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl(''),
      contact: new FormControl(''),
    });
  }

  //this will add new form in current index
  public addLegalFormGroup() {
    const entity = this.legalGroups.get('newlegalEntity') as FormArray;
    entity.push(this.createLegalFormGroup());
  }

  //removeing form from NEW data
  public removeLegalFormGroup(i: number) {
    const entity = this.legalGroups.get('newlegalEntity') as FormArray;
    if (entity.length > 1) {
      entity.removeAt(i);
    } else {
      entity.reset();
    }
  }
  //this will submit overall data based on condition
  //by default in this example isEdit is 'false'
  submit() {
    let objSeprated = {};
    if (this.isEdit) {
      if (this.valueChange) {
        const getformObj = this.valueChange();
        getformObj.map((el) => (objSeprated = el));
        console.log('Update Value', getformObj);
      }
    } else {
      const newformObj = this.legalGroups.get('newlegalEntity').value;
      newformObj.map((el) => (objSeprated = el));
      const finalResult = { ...objSeprated, ...this.userData };
      this.legalGroupInterface.legalEntityarr.push(finalResult);
      console.log(finalResult);
    }
  }
  //for getting updated value from inputs
  valueChange() {
    return this.legalGroups.get('legalEntity').value;
  }
  //removeing form from GET data
  removegetLegalFormGroup(i: number) {
    const entity = this.legalGroups.get('legalEntity') as FormArray;
    entity.removeAt(i);
  }

  get formRef() {
    return this.legalGroups.get('newlegalEntity') as FormArray;
  }

  //for calculating total number of index of all forms
  getallFormIndex() {
    const forms = this.legalGroups.get('legalEntity').value;
    const newentity = this.legalGroups.get('newlegalEntity').value;
    const newformLength = newentity.length;
    this.newformLength = newformLength;
    const indexOf = forms.length;
    this.newIndex = indexOf;
  }
}

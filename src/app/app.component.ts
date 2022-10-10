import { Component, OnInit, VERSION } from '@angular/core';
import { formControl } from '@angular/core/schematics/migrations/typed-forms/util';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
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
  }

  private createLegalFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
    });
  }

  public addLegalFormGroup() {
    const entity = this.legalGroups.get('newlegalEntity') as FormArray;
    entity.push(this.createLegalFormGroup());
  }
  public removeLegalFormGroup(i: number) {
    const entity = this.legalGroups.get('newlegalEntity') as FormArray;
    if (entity.length > 1) {
      entity.removeAt(i);
    } else {
      entity.reset();
    }
  }
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

  valueChange() {
    return this.legalGroups.get('legalEntity').value;
  }

  removegetLegalFormGroup(i: number) {
    const entity = this.legalGroups.get('legalEntity') as FormArray;
    // if (entity.length > 1) {
    entity.removeAt(i);
    // } else {
    //  entity.reset();
    // }
  }
}

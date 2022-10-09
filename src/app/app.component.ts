import { Component, OnInit, VERSION } from '@angular/core';
import { formControl } from '@angular/core/schematics/migrations/typed-forms/util';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

      // const fname = this.formDataFromApi.map((el) => el.fullname);;
    }
    this.legalGroups = this.formBuilder.group({
      // legalEntity: this.formBuilder.array([this.createLegalFormGroup()]),
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
    // console.log('default', this.legalGroups.get('getlegalEntity'));
  }

  private createLegalFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
    });
  }

  public addLegalFormGroup() {
    const entity = this.legalGroups.get('legalEntity') as FormArray;
    entity.push(this.createLegalFormGroup());
  }
  public removeLegalFormGroup(i: number) {
    const entity = this.legalGroups.get('legalEntity') as FormArray;
    if (entity.length > 1) {
      entity.removeAt(i);
    } else {
      entity.reset();
    }
  }
  submit() {
    const formObj = this.legalGroups.get('legalEntity').value;
    let newObj = {};
    formObj.map((el) => (newObj = el));
    const finalResult = { ...newObj, ...this.userData };
    this.legalGroupInterface.legalEntityarr.push(finalResult);
    console.log(this.legalGroupInterface);
  }
}

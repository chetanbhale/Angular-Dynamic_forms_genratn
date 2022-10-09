import { Component, OnInit, VERSION } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.legalGroups = this.formBuilder.group({
      legalEntity: this.formBuilder.array([this.createLegalFormGroup()]),
    });
    this.userData = {
      username: 'demoUsername',
      // caseconnectID: '123ahskdj231',
    };
    this.legalGroupInterface.casconnectID = 'CaConnectid_1';
    this.legalGroupInterface.legalEntityarr = [];
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

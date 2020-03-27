import { Injectable, OnInit } from '@angular/core';
import { Form } from '../../models/form';
import { HttpService } from './http.service';
import { SelectControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public forms: Form[];

  constructor(
    private httpService: HttpService,
  ) {
    this.forms = [];
  }

  retrieveForms() {
    this.httpService.get('auth/getForms', null).subscribe(
      success => {
        if (success[0])
          this.forms = Object.assign(this.forms, success[1]);
      },
      failure => {
        console.log("Failed because reasons: ", failure);
      }
    )
  }

  retrieveForm(email: String) {
    this.httpService.post('auth/getFormByEmail', email).subscribe(
      success => {
        if (success[0])
          this.forms = Object.assign(this.forms, success[1]);
      },
      failure => {
        console.log("Failed because reasons: ", failure);
      }
    )
  }

  updateFormStatus(form: Form) {
    return this.httpService.post('auth/updateFormStatus', form).subscribe(
      success => {
        if (success[0])
          this.forms = Object.assign(this.forms, this.forms, success[1]);
      },
      failure => {
        console.log("Failed because reasons: ", failure);
      }
    )
  }

  getForms(isLoggedIn) {
    if (isLoggedIn)
      return this.retrieveForms();
    else
      return {};
  }

  getForm(id: Number) {
    return this.forms.find(form => form.id == id);
  }

  clearForms() {
    this.forms = [];
  }
}

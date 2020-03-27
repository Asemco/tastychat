import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../models/user';
import { Form } from '../models/form';
import { FormService } from '../core/services/form.service';

@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.scss']
})
export class FormlistComponent implements OnInit {
  forms: Form[];
  user: User;

  constructor(
    public formService: FormService,
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.formService.getForms(this.userService.isLoggedIn());
    this.forms = this.formService.forms;
    this.user = this.userService.user;
  }

}

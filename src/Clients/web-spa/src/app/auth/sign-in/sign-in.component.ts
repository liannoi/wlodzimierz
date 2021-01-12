import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';
import {UserModel} from '../shared/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInFormGroup!: FormGroup;
  private user: UserModel = new UserModel();

  constructor(private titleService: Title) {
    titleService.setTitle('Sign in to Wlodzimierz - Wlodzimierz');
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.signInFormGroup = new FormGroup({
      username: new FormControl(this.user.username),
      password: new FormControl(this.user.password)
    });
  }
}

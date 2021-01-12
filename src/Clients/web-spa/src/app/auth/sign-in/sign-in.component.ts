import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInFormGroup: FormGroup | undefined;

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
      username: new FormGroup({})
    });
  }
}

import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  formSignUP: FormGroup;
  primaryPosts = ['', ''];
  userData: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.formSignUP = this.formBuilder.group({
      fullName: [''],
      username: [''],
      email: [''],
      password: [''],
      posts: [''],
    });
  }

  submitSignUp() {
    this.userData = {
      fullName: this.formSignUP.value.fullName,
      username: this.formSignUP.value.username,
      email: this.formSignUP.value.email,
      password: this.formSignUP.value.password,
    };
    console.log(this.userData);

    this.api
      .postUsers(this.userData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        console.log('http posted!!');
        this.router.navigate(['/auth/login']);
        this.formSignUP.reset();
      });
  }
  toLogin() {
    this.router.navigate(['/login']);
  }
}

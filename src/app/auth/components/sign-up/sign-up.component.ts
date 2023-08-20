import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  formSignUP!: FormGroup;
  primaryPosts = ['', ''];
  canDeactiveBool: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService
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
    this.formSignUP.value.posts = this.primaryPosts;
    this.api.postUsers(this.formSignUP.value).subscribe((res) => {
      console.log('http posted!!');
      this.canDeactiveBool = false;
      this.router.navigate(['/auth/login']);
      this.formSignUP.reset();
    });
  }
  toLogin() {
    this.canDeactiveBool = false;
    this.router.navigate(['/auth/login']);
  }
  canExit() {
    if (this.canDeactiveBool) {
      return false;
    } else {
      return true;
    }
  }
}

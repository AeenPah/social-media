import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
      commentBoxBool: [''],
      comments: [''],
    });
  }

  submitSignUp() {
    this.formSignUP.value.posts = this.primaryPosts;
    this.formSignUP.value.comments = this.primaryPosts;
    this.api
      .postUsers(this.formSignUP.value)
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

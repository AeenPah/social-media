import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SingUpComponent implements OnInit {
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
      this.router.navigate(['/login']);
      this.formSignUP.reset();
    });
  }
  toLogin() {
    this.canDeactiveBool = false;
    this.router.navigate(['/login']);
  }
  canExit() {
    if (this.canDeactiveBool) {
      return false;
    } else {
      return true;
    }
  }
}

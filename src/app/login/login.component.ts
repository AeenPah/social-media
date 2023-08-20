import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  canDeactiveBool: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userDataService: UserDataService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: [''],
      password: [''],
    });
    this.canDeactiveBool = true;
  }

  submitLogin() {
    this.api.getFromUsers().subscribe((res) => {
      const user = res.find((item: any) => {
        return (
          item.username === this.formLogin.value.username &&
          item.password === this.formLogin.value.password
        );
      });
      if (user) {
        alert('Right!!');
        this.userDataService.userData = user;
        this.canDeactiveBool = false;
        this.router.navigate(['profile']);
      } else {
        alert('somthing Wrong!');
      }
      this.formLogin.reset();
    });
  }
  register() {
    this.canDeactiveBool = false;
    this.router.navigate(['/signup']);
  }
  canExit() {
    if (this.canDeactiveBool) {
      return false;
    } else {
      return true;
    }
  }
}

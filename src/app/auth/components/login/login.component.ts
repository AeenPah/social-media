import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  // canDeactiveBool: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userDataService: UserDataService,
    private api: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: [''],
      password: [''],
    });
    // this.canDeactiveBool = true;
    console.log(this.authService.loggedIn); //delete it..
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
        // this.canDeactiveBool = false;
        this.authService.login();
        this.router.navigate(['/profile']);
      } else {
        alert('somthing Wrong!');
      }
      this.formLogin.reset();
    });
  }
  register() {
    // this.canDeactiveBool = false;
    this.router.navigate(['sign-up']);
  }
  // canExit() {
  //   if (this.canDeactiveBool) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}

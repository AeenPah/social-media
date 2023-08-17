import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms'
import {  Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin !: FormGroup;
  

  constructor (private formBuilder:FormBuilder,private http:HttpClient
    ,private router:Router,private userDataService:UserDataService){}
  
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username : [''],
      password : ['']
    })
  }

  submitLogin(){
    this.http.get<any>('http://localhost:3000/users').subscribe(res => {
      const user = res.find((item:any) => {
        return item.username === this.formLogin.value.username && item.password === this.formLogin.value.password;
      });
      if (user) {
        alert("Right!!");
        this.userDataService.userData = user;
        this.router.navigate(['profile']);
      }else{
        alert("somthing Wrong!")
      }
      this.formLogin.reset();
    })
  }


}

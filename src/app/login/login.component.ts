import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms'
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin !: FormGroup;
  

  constructor (private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
  
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
      console.log(user); // erase this !!
      if (user) {
        alert("Right!!");
        this.router.navigate(['home'])
      }else{
        alert("somthing Wrong!")
      }
      this.formLogin.reset();
    })
  }


}

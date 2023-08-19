import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  formSignUP !: FormGroup;
  primaryPosts = ['',''];
  canDeactiveBool:boolean = true;

  constructor (private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}

  ngOnInit(): void {
    this.formSignUP = this.formBuilder.group({
      fullName : [''],
      username : [''],
      email: [''],
      password : [''],
      posts:[''] 
    })
  }

  submitSignUp(){
    this.formSignUP.value.posts = this.primaryPosts;
    this.http.post('http://localhost:3000/users',this.formSignUP.value).subscribe(res => {
      console.log("http posted!!");
      this.formSignUP.reset();
      this.router.navigate(['/login']);
    })
  }
  toLogin(){
    this.canDeactiveBool = false;
    this.router.navigate(['/login']);
  }
  canExit(){
    if (this.canDeactiveBool) {
      return false;
    }else{
      return true
    }
  }
}

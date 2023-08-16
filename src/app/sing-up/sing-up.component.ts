import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  formSignUP !: FormGroup;
  

  constructor (private formBuilder:FormBuilder,private http:HttpClient){}

  ngOnInit(): void {
    this.formSignUP = this.formBuilder.group({
      fullName : [''],
      username : [''],
      email: [''],
      password : ['']
    })
  }

  submitSignUp(){
    this.http.post('http://localhost:3000/users',this.formSignUP.value).subscribe(res => {
      console.log("http posted!!");
      this.formSignUP.reset();
    })
  }
}

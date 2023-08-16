import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  formValue !: FormGroup;

  constructor (private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fullName : [''],
      username : [''],
      email: [''],
      password : ['']
    })
  }
}

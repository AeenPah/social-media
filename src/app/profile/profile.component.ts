import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any ;
  newuser: any ;
  postDate: Date = new Date;
  posttxt !:string;
  test : string[] = ['']

  constructor(private userDataService:UserDataService,private http:HttpClient){}

  ngOnInit(): void {
    this.user = this.userDataService.userData;
  }

  postText(){
    this.test = this.user.posts;
    this.test.push(this.posttxt);
    this.user.posts = this.test;
    this.http.put<any>('http://localhost:3000/users/'+this.user.id,this.user).subscribe(res =>{
      console.log(res)
    })
  }
}

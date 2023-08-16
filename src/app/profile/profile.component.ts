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
  posttx !:string;
  test = ['another post','another'];

  constructor(private userDataService:UserDataService,private http:HttpClient){}

  ngOnInit(): void {
    this.user = this.userDataService.userData;
    console.log(this.user.post);
  }

  postText(){
    this.test.push(this.posttx);
    this.user.posts = this.test;
    // this.newuser = this.user.push(this.test);
    this.http.put<any>('http://localhost:3000/users/'+this.user.id,this.user).subscribe(res =>{
      console.log(res)
    })
    console.log(this.newuser);

  }
}

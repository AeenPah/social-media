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
  currentPost : string[] = [''];
  homePost : any;

  constructor(private userDataService:UserDataService,private http:HttpClient){}

  ngOnInit(): void {
    this.user = this.userDataService.userData;
    this.currentPost = this.user.posts;
    //  --------------------------------------------------
    console.log(this.currentPost.length);
    console.log(this.user.id);
  }
  
  postText(){
    this.currentPost.push(this.posttxt);
    this.user.posts = this.currentPost;
    this.http.put<any>('http://localhost:3000/users/'+this.user.id,this.user).subscribe(res =>{
      console.log(res)
    });
    //  --------------------------------------------------
    this.homePost = {userid : this.user.id, userPost:this.posttxt };
    console.log(this.homePost);
    this.http.post<any>('http://localhost:3000/homePosts',this.homePost).subscribe(res => {

    })
  }
}

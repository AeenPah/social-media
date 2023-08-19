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
  anotherCurrntPost : string[] = [''];
  homePost : any;
  tempUser : any ;

  constructor(private userDataService:UserDataService,private http:HttpClient){}

  ngOnInit(): void {
    this.user = this.userDataService.userData;
    this.currentPost = this.user.posts;
    this.anotherCurrntPost = this.user.posts;
    console.log(this.anotherCurrntPost)
    //  --------------------------------------------------
    // console.log(this.currentPost.length);
    // console.log(this.user.id);
  }
  
  postText(){
    this.currentPost.push(this.posttxt);
    this.user.posts = this.currentPost;
    this.http.put<any>('http://localhost:3000/users/'+this.user.id,this.user).subscribe(res =>{
      // console.log(res)
    });
    //  --------------------------------------------------
    this.homePost = {userid : this.user.id, userPost : this.posttxt, postLikes: 0 , postLikeBool:false };
    console.log(this.homePost);
    this.http.post<any>('http://localhost:3000/homePosts',this.homePost).subscribe(res => {
    })
  }
  deleteText(a:number){
    // ----
    // this.http.delete('http://localhost:3000/users/'+this.user.id).subscribe()
    console.log(this.currentPost[a]);
    this.currentPost.splice(a,1);
    this.user.posts = this.currentPost;
    this.http.put<any>('http://localhost:3000/users/'+this.user.id,this.user).subscribe(res =>{
      console.log(res)
    });
  }
  deleteTextHome(a:number){
    this.http.get<any>('http://localhost:3000/homePosts').subscribe(res => {
      const homepost = res.find((item:any) => {
         this.tempUser = item.id 
         console.log(item.userPost);
         console.log(this.anotherCurrntPost[a]);

         return item.userPost == this.anotherCurrntPost[a]
      });
      if (homepost) {
        console.log('we find it');
        console.log(this.tempUser);
        this.http.delete('http://localhost:3000/homePosts/' + this.tempUser).subscribe(res => {
          console.log(res)
        });
      }else{
        console.log('We can not find the post in home!')
      }
    })
  }
  // this is a bug here!!
  deleteTextBoth(a:number){
    this.deleteTextHome(a);
    this.deleteText(a);
  }
}

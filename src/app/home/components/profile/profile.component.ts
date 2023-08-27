import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  newuser: any;
  postDate: Date = new Date();
  posttxt!: string;
  currentPost: string[] = [''];
  anotherCurrntPost: string[] = [''];
  homePost: any;
  tempUserId: any;
  userId: string;

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId');
    if (this.userId != '0') {
      this.api.getFromUsersById(this.userId).subscribe((res) => {
        this.user = res;
        this.currentPost = this.user.posts;
        this.anotherCurrntPost = this.user.posts;
      });
      // this.user = this.userDataService.userData;
      console.log(this.user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  postText() {
    this.currentPost.push(this.posttxt);
    this.user.posts = this.currentPost;
    this.api.putUserById(this.user.id, this.user).subscribe((res) => {
      // console.log(res)
    });
    //  --------------------------------------------------
    this.homePost = {
      userid: this.user.id,
      userPost: this.posttxt,
      postLikes: 0,
      postLikeBool: false,
    };
    // console.log(this.homePost);
    this.api.postHomePosts(this.homePost).subscribe();
  }
  deleteText(a: number) {
    // ----
    // this.http.delete('http://localhost:3000/users/'+this.user.id).subscribe()
    // console.log(this.currentPost[a]);
    this.currentPost.splice(a, 1);
    this.user.posts = this.currentPost;
    this.api.putUserById(this.user.id, this.user).subscribe((res) => {
      // console.log(res);
    });
  }
  deleteTextHome(a: number) {
    this.api.getFromHomePosts().subscribe((res) => {
      const homepost = res.find((item: any) => {
        this.tempUserId = item.id;
        //  console.log(item.userPost);
        //  console.log(this.anotherCurrntPost[a]);

        return item.userPost == this.anotherCurrntPost[a];
      });
      if (homepost) {
        console.log('we find it');
        // console.log(this.tempUser);
        this.api.deleteFromHomePosts(this.tempUserId).subscribe((res) => {
          // console.log(res)
        });
        this.deleteText(a);
      } else {
        console.log('We can not find the post in home!');
      }
    });
  }
}

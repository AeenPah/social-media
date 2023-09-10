import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/interfaces/post.inteface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: IUser;
  userId: any;
  userPosts: IPost[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((param) => {
        this.userId = param.get('id');
        this.api
          .getFromUsers()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            res.find((item: any) => {
              this.user = item;
              return item.id == this.userId;
            });
            this.findUserPosts();
          });
      });
  }

  findUserPosts() {
    this.userPosts = [];
    this.api
      .getFromHomePosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        let allposts: IPost[] = res;
        allposts.map((userPostFind: IPost) => {
          if (this.user.id == userPostFind.userid) {
            this.userPosts.push(userPostFind);
          }
        });
      });
  }
}

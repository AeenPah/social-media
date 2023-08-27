import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userall: any;
  userId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private authservice: AuthService,
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
            const userProf = res.find((item: any) => {
              this.userall = item;
              return item.id == this.userId;
            });
          });
      });
    console.log(this.authservice.loggedIn);
  }
}

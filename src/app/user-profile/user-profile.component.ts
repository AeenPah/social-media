import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.userId = param.get('id');
      this.http.get<any>('http://localhost:3000/users').subscribe((res) => {
        const userProf = res.find((item: any) => {
          this.userall = item;
          return item.id == this.userId;
        });
      });
    });
  }
}

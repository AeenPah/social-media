import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-controler',
  templateUrl: './page-controler.component.html',
  styleUrls: ['./page-controler.component.css'],
})
export class PageControlerComponent {
  @Input() counter: number;
  @Input() loopCount: number;
  @Input() allPostsInf;
  @Input() postsByPages;
  @Input() pagesNumber;
  @Output() postsEmit = new EventEmitter<any>();

  public toNextPage() {
    if (this.counter < this.loopCount) {
      this.counter++;
      this.allPostsInf = this.postsByPages[this.counter];
      this.sendPosts(this.allPostsInf);
    }
  }
  public toPrevPage() {
    if (this.counter > 0) {
      this.counter--;
      this.allPostsInf = this.postsByPages[this.counter];
      console.log(this.allPostsInf);
      this.sendPosts(this.allPostsInf);
    }
  }
  public goToPage(page: number) {
    this.counter = page;
    this.allPostsInf = this.postsByPages[page];
    this.sendPosts(this.allPostsInf);
  }
  sendPosts(posts: any) {
    this.postsEmit.emit(posts);
  }
}

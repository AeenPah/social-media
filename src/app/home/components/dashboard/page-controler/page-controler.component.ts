import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-controler',
  templateUrl: './page-controler.component.html',
  styleUrls: ['./page-controler.component.css'],
})
export class PageControlerComponent {
  @Input() counter;
  @Input() loopCount;
  @Input() allPostsInf;
  @Input() postsByPages;
  @Input() pagesNumber;

  public toNextPage() {
    if (this.counter < this.loopCount) {
      this.counter++;
      this.allPostsInf = this.postsByPages[this.counter];
    }
  }
  public toPrevPage() {
    if (this.counter > 0) {
      this.counter--;
      this.allPostsInf = this.postsByPages[this.counter];
      console.log(this.allPostsInf);
    }
  }
  public goToPage(page: number) {
    this.counter = page;
    this.allPostsInf = this.postsByPages[page];
  }
}

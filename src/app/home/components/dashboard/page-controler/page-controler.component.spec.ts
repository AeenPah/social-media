import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageControlerComponent } from './page-controler.component';

describe('PageControlerComponent', () => {
  let component: PageControlerComponent;
  let fixture: ComponentFixture<PageControlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageControlerComponent]
    });
    fixture = TestBed.createComponent(PageControlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

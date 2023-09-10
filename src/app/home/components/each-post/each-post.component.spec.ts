import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachPostComponent } from './each-post.component';

describe('EachPostComponent', () => {
  let component: EachPostComponent;
  let fixture: ComponentFixture<EachPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EachPostComponent]
    });
    fixture = TestBed.createComponent(EachPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

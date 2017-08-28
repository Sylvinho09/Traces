import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBlocsComponent } from './display-blocs.component';

describe('DisplayBlocsComponent', () => {
  let component: DisplayBlocsComponent;
  let fixture: ComponentFixture<DisplayBlocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBlocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBlocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

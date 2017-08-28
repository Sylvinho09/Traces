import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDBComponent } from './drop-db.component';

describe('DropDBComponent', () => {
  let component: DropDBComponent;
  let fixture: ComponentFixture<DropDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

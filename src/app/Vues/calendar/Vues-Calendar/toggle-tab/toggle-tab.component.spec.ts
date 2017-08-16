import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleTabComponent } from './toggle-tab.component';

describe('ToggleTabComponent', () => {
  let component: ToggleTabComponent;
  let fixture: ComponentFixture<ToggleTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

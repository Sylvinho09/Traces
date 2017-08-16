import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderableTabComponent } from './orderable-tab.component';

describe('OrderableTabComponent', () => {
  let component: OrderableTabComponent;
  let fixture: ComponentFixture<OrderableTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderableTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderableTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

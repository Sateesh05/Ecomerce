import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderchartsComponent } from './ordercharts.component';

describe('OrderchartsComponent', () => {
  let component: OrderchartsComponent;
  let fixture: ComponentFixture<OrderchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

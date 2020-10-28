import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendarComponent } from './vendar.component';

describe('VendarComponent', () => {
  let component: VendarComponent;
  let fixture: ComponentFixture<VendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

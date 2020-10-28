import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendarReporttComponent } from './vendar-reportt.component';

describe('VendarReporttComponent', () => {
  let component: VendarReporttComponent;
  let fixture: ComponentFixture<VendarReporttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendarReporttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendarReporttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

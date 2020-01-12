import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendenceViewComponent } from './student-attendence-view.component';

describe('StudentAttendenceViewComponent', () => {
  let component: StudentAttendenceViewComponent;
  let fixture: ComponentFixture<StudentAttendenceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendenceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

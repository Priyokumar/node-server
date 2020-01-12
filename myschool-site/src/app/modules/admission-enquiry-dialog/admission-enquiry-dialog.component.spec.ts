import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionEnquiryDialogComponent } from './admission-enquiry-dialog.component';

describe('AdmissionEnquiryDialogComponent', () => {
  let component: AdmissionEnquiryDialogComponent;
  let fixture: ComponentFixture<AdmissionEnquiryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionEnquiryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionEnquiryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdmissionEnquiryDialogComponent } from '../admission-enquiry-dialog/admission-enquiry-dialog.component';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {
  width: string;

  constructor(private dialog: MatDialog, private media: MediaObserver) {

    this.media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === "lg" || change.mqAlias === "xl" || change.mqAlias === "gt-md" || change.mqAlias === "gt-lg") {
        this.width = "30vw";
      } else {
        this.width = "90vw";
      }
    })
  }

  ngOnInit() {
  }

  openAdmissionEnquiryDialog() {
    this.dialog.open(AdmissionEnquiryDialogComponent, { width: this.width });
  }

}

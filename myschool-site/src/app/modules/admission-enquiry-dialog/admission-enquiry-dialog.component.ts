import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { FormControl, FormGroup } from '@angular/forms';
import { standards } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/service/loader.service';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';


@Component({
  selector: 'app-admission-enquiry-dialog',
  templateUrl: './admission-enquiry-dialog.component.html',
  styleUrls: ['./admission-enquiry-dialog.component.scss']
})
export class AdmissionEnquiryDialogComponent implements OnInit {
  width: string;

  admissionForm: FormGroup;
  standards = standards;

  nameFormCntrl = new FormControl("");
  emailOrMobileFormCntrl = new FormControl("");
  standardFormCntrl = new FormControl("");
  descriptionFormCntrl = new FormControl("");

  constructor(private dialogRef: MatDialogRef<AdmissionEnquiryDialogComponent>,
    private http: HttpClient,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar) {

    this.admissionForm = new FormGroup({
      nameFormCntrl: this.nameFormCntrl,
      emailOrMobileFormCntrl: this.emailOrMobileFormCntrl,
      standardFormCntrl: this.standardFormCntrl,
      descriptionFormCntrl: this.descriptionFormCntrl
    })

  }

  ngOnInit() {
  }


  async submit() {

    if (!this.nameFormCntrl.value || !this.emailOrMobileFormCntrl.value || !this.standardFormCntrl.value || !this.descriptionFormCntrl.value)
      return;

    let reqBody = {
      name: this.nameFormCntrl.value,
      emailMobile: this.emailOrMobileFormCntrl.value,
      standard: this.standardFormCntrl.value,
      description: this.descriptionFormCntrl.value
    }
    console.log(reqBody);

    try {

      this.loaderService.change(true);
      let resp = await this.http.post(ApiEndpoint.ADMISSION_ENQUIRY, reqBody).toPromise();
      this.loaderService.change(false);
      this.admissionForm.reset();
      this.dialogRef.close();
      this.snackBar.open("Thanks for contacting us.", "Ok", {
        duration: 8000,
      });

    } catch (error) {

      this.loaderService.change(false);
      console.log(error);
      this.dialogRef.close();
      this.snackBar.open("Something went wrong ):", "Ok", {
        duration: 8000,
      });
    }

  }


  close() {
    this.dialogRef.close();
  }

}

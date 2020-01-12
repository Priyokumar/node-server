import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/service/loader.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';


export const standards = ["Nursery", "Kg", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [
    "../../../assets/images/carousal/1.jpg",
    "../../../assets/images/carousal/4.jpg",
    "../../../assets/images/carousal/5.JPG",
    "../../../assets/images/carousal/6.JPG"
  ];

  admissionForm: FormGroup;
  standards = standards;

  nameFormCntrl = new FormControl("", Validators.required);
  emailOrMobileFormCntrl = new FormControl("", Validators.required);
  standardFormCntrl = new FormControl("", Validators.required);
  descriptionFormCntrl = new FormControl("", Validators.required);

  constructor(private http: HttpClient,
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
      this.snackBar.open("Thanks for contacting us.", "Ok", {
        duration: 8000,
      });

    } catch (error) {

      this.loaderService.change(false);
      console.log(error);
      this.snackBar.open("Something went wrong ):", "Ok", {
        duration: 8000,
      });
    }

  }

}

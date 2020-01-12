import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { LoaderService } from 'src/app/service/loader.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {


  contactForm: FormGroup;

  nameFormCntrl = new FormControl("");
  emailOrMobileFormCntrl = new FormControl("");
  descriptionFormCntrl = new FormControl("");

  errorMessage: string;

  constructor(private http: HttpClient,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar) {

    this.contactForm = new FormGroup({
      nameFormCntrl: this.nameFormCntrl,
      emailOrMobileFormCntrl: this.emailOrMobileFormCntrl,
      descriptionFormCntrl: this.descriptionFormCntrl
    })

  }

  ngOnInit() {
  }

  async submit() {

    if (!this.nameFormCntrl.value || !this.emailOrMobileFormCntrl.value || !this.descriptionFormCntrl.value)
      return;

    let reqBody = {
      name: this.nameFormCntrl.value,
      emailMobile: this.emailOrMobileFormCntrl.value,
      description: this.descriptionFormCntrl.value
    }

    try {

      this.errorMessage = null;
      this.loaderService.change(true);
      let resp = await this.http.post(ApiEndpoint.CONTACT_US, reqBody).toPromise();
      this.loaderService.change(false);
      this.contactForm.reset();
      this.snackBar.open("Thanks for contacting us.", "Close", {
        duration: 8000,
      });

    } catch (error) {

      this.loaderService.change(false);
      this.errorMessage = "Opps ): Something went wrong";
      console.log(error);

    }

  }

}

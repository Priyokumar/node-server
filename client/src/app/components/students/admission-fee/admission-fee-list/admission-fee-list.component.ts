import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IAdmission } from 'src/app/model/admission-fee.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-admission-fee-list',
  templateUrl: './admission-fee-list.component.html',
  styleUrls: ['./admission-fee-list.component.css']
})
export class AdmissionFeeListComponent implements OnInit {

  public errorMessage: String;
  public admissionColumns: string[] = ["id", "name", "registrationNo", "Class", "Admission Number", "action"];
  public admissionsDataSource: MatTableDataSource<IAdmission>;
  public admissions: IAdmission[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getAdmissions();
  }

  private getAdmissions() {

    let resp;
    this.http.get(ApiEndpoint.ADMISSIONS).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.admissions = resp.data;
        this.admissionsDataSource = new MatTableDataSource(this.admissions);

        if (!this.admissions)
          this.errorMessage = "No Admission found";

      } else {
        this.errorMessage = resp.apiMessage.detail;
      }

    }, err => {
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message

      console.error(err);
    })

  }

  public onClickRow(admId: Number) {

    this.router.navigate(["/student/" + admId + "/admission-view"])

  }

  public onDeleteRow(admId: Number) {

    this.http.delete(ApiEndpoint.ADMISSIONS + "/" + admId).subscribe(data => {
      this.admissionsDataSource = new MatTableDataSource([]);
      this.ngOnInit()
    }, err => {
      console.error(err)
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }


}

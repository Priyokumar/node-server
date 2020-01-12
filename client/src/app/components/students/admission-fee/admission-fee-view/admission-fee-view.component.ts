import { Component, OnInit } from '@angular/core';
import { IAdmission, IFee } from 'src/app/model/admission-fee.model';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admission-fee-view',
  templateUrl: './admission-fee-view.component.html',
  styleUrls: ['./admission-fee-view.component.css']
})
export class AdmissionFeeViewComponent implements OnInit {

  errorMessage: String;
  admId: String;
  admission: IAdmission;

  public feeColumns: string[] = [

    "id",
    "feeRef",
    "amount",
    "exptdateOfPayment",
    "actdateOfPayment",
    "monthOf",
    "status",
    "action"
  ];

  public feesDataSource: MatTableDataSource<IFee>;
  public fee: IFee[] = [];

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.admId = params.admId;
    })
  }

  ngOnInit() {
    this.getAdmission();
  }

  getAdmission() {

    let resp;
    this.http.get(ApiEndpoint.ADMISSIONS + "/" + this.admId).subscribe(data => {
      resp = data;
      this.admission = resp.data;

      if (this.admission.fees) {
        this.feesDataSource = new MatTableDataSource(this.admission.fees)
      }

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  delete() {

    this.http.delete(ApiEndpoint.ADMISSIONS + "/" + this.admId).subscribe(data => {
      this.router.navigate(["/student/admissions"]);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  edit() {
    this.router.navigate(["/student/" + this.admId + "/admission-edit"]);
  }

  onDeleteFeeRow(feeId: Number) {

  }

  onClickRow(fee: IFee) {

  }

}

import { Component, OnInit } from '@angular/core';
import { IAdmissionFeeMaintenanceYearly, IAdmissionFeeMaintenance } from 'src/app/model/maintenance';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admissionfee-structure-view',
  templateUrl: './admissionfee-structure-view.component.html',
  styleUrls: ['./admissionfee-structure-view.component.css']
})
export class AdmissionfeeStructureViewComponent implements OnInit {

  errorMessage: String;
  admFeeStructureId: String;
  admFeeStructure: IAdmissionFeeMaintenanceYearly;

  public admFeeStructureColumns: string[] = ["id", "standard", "feeAmount", "admissionAmount"]
  public admFeeStructureDataSource: MatTableDataSource<IAdmissionFeeMaintenance>;
  public admFeeStructures: IAdmissionFeeMaintenance[] = [];

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.admFeeStructureId = params.admfeeId;
    })
  }

  ngOnInit() {
    this.getAdmFeeStructure();
  }

  getAdmFeeStructure() {

    this.http.get(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + "/" + this.admFeeStructureId).subscribe(data => {

      this.admFeeStructure = data["data"]
      this.admFeeStructures = this.admFeeStructure.maintenanceAdmissionFees
      this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures)
      console.log(this.admFeeStructures)

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  delete() {

    this.http.delete(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + "/" + this.admFeeStructureId).subscribe(data => {
      this.router.navigate(["/maintenance/admission-fees"]);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  edit() {
    this.router.navigate(["/maintenance/admission-fees/" + this.admFeeStructureId + "/edit"]);
  }

}

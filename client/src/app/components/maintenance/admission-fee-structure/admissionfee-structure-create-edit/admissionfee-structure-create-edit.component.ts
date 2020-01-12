import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAdmissionFeeMaintenanceYearly, IAdmissionFeeMaintenance } from 'src/app/model/maintenance';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { CommonService } from 'src/app/service/common.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AdmissionFeeStructureDialogComponent } from '../admission-fee-structure-dialog/admission-fee-structure-dialog.component';

@Component({
  selector: 'app-admissionfee-structure-create-edit',
  templateUrl: './admissionfee-structure-create-edit.component.html',
  styleUrls: ['./admissionfee-structure-create-edit.component.css', '../../../../../assets/css/form-common.css']
})
export class AdmissionfeeStructureCreateEditComponent implements OnInit {


  admFeeStructureYearlId: number
  errorMessage: String

  public admFeeStructureColumns: string[] = ["id", "standard", "feeAmount", "admissionAmount", "action"]
  public admFeeStructureDataSource: MatTableDataSource<IAdmissionFeeMaintenance>;
  public admFeeStructures: IAdmissionFeeMaintenance[] = [];

  admFeeStructureYearlyForm: FormGroup
  admFeeStructureYearly: IAdmissionFeeMaintenanceYearly
  years: String[] = []

  idFormCtl = new FormControl('', null)
  yearFormCtl = new FormControl('', Validators.required)

  constructor(private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private dialog: MatDialog) {

    this.admFeeStructureYearlyForm = new FormGroup({

      yearFormCtl: this.yearFormCtl,

    })

    this.activatedRoute.params.subscribe(params => {
      this.admFeeStructureYearlId = params.admfeeId
      if (this.admFeeStructureYearlId) {
        this.getAdmFeeStructureYearly()
      }
    })
  }

  ngOnInit() {
    this.years = this.commonService.yearsLtCurrentYear(10);
  }

  public getAdmFeeStructureYearly(): any {
    this.http.get(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + "/" + this.admFeeStructureYearlId).subscribe(data => {
      this.admFeeStructureYearly = data["data"]
      this.setForm()
    }, err => {
      console.error(err)
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  public save() {

    let admFeeStructureYearlyPayload: IAdmissionFeeMaintenanceYearly = {

      id: this.idFormCtl.value,
      year: this.yearFormCtl.value,
      maintenanceAdmissionFees: this.admFeeStructures

    }

    this.saveOrUpdateHttpObservable(admFeeStructureYearlyPayload).subscribe(data => {

      let apiMessage = data["apiMessage"]

      if (apiMessage.error) {
        this.errorMessage = apiMessage.detail
        return;
      }

      this.router.navigate(["/maintenance/admission-fees"])
    }, err => {

      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  private saveOrUpdateHttpObservable(admFeeStructureYearlyPayload: IAdmissionFeeMaintenanceYearly) {

    if (this.admFeeStructureYearlId) {
      return this.http.put(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + "/" + this.admFeeStructureYearlId, admFeeStructureYearlyPayload)
    }
    else {
      return this.http.post(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE, admFeeStructureYearlyPayload)
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.admFeeStructureYearly.id)
    this.yearFormCtl.setValue(this.admFeeStructureYearly.year)
    this.admFeeStructures = this.admFeeStructureYearly.maintenanceAdmissionFees
    this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures)
  }

  public addAdmFeeStructure() {
    let dialogRef = this.dialog.open(AdmissionFeeStructureDialogComponent, { width: '60%' })
      .afterClosed().subscribe(data => {
        if (data) {
          if (!this.admFeeStructures)
            this.admFeeStructures = []
          this.admFeeStructures.push(data);
          this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
        }
      });
  }

  public onDelete(index: number) {
    this.admFeeStructures.splice(index, 1);
    this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
  }

  public edit(index: number, admFeeMaint: IAdmissionFeeMaintenance) {
    let dialogRef = this.dialog.open(AdmissionFeeStructureDialogComponent, { width: '60%', data: admFeeMaint })
      .afterClosed().subscribe(data => {
        if (data) {
          this.admFeeStructures[index] = data;
          this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
        }
      });
  }

}

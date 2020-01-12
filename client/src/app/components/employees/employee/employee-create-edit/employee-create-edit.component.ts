import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Employee } from './employee';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { IEmployee } from 'src/app/model/employeeModels';

@Component({
  selector: 'app-employee-create-edit',
  templateUrl: './employee-create-edit.component.html',
  styleUrls: ['./employee-create-edit.component.css', '../../../../../assets/css/form-common.css']
})
export class EmployeeCreateEditComponent extends Employee implements OnInit {

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    super();

    this.activatedRoute.params.subscribe(params => {
      this.empId = params.empId;
    })
  }

  ngOnInit() {
    if (this.empId)
      this.getEmployee();
  }

  getEmployee() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEES + "/" + this.empId).subscribe(data => {
      resp = data;
      this.employee = resp.data;
      this.setEmployeeForm();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  uploadPhoto(file: File) {
    console.log(file)
  }

  public save() {

    let datePipe = new DatePipe("en-US");
    let employeePayloadData: IEmployee = {
      id: null,
      firstName: this.firstName.value,
      middleName: this.middleName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      mobileNo: this.mobileNo.value,
      status: this.status.value,
      dob: datePipe.transform(this.dob.value, 'MM/dd/yyyy'),
      joiningDate: datePipe.transform(this.joiningDate.value, 'MM/dd/yyyy'),
      employeeType: this.employeeType.value,
      designation: this.designation.value,

      personalInfo: {
        id: this.pid.value,
        panCard: this.panCard.value,
        aadharCard: this.aadharCard.value,
        voterId: this.voterId.value,
        drivingLicence: this.drivingLicence.value
      },
      correspondentAddress: {
        id: this.corAddId.value,
        firstLine: this.corrFirstLine.value,
        secondLine: this.corrSecondLine.value,
        country: this.corrCountry.value,
        state: this.corrState.value,
        district: this.corrDistrict.value
      },
      permanentAddress: {
        id: this.permAddId.value,
        firstLine: this.permtFirstLine.value,
        secondLine: this.permtSecondLine.value,
        country: this.permtCountry.value,
        state: this.permtState.value,
        district: this.permtDistrict.value
      },

      highestQualification: {
        id: this.acaIdFormCtl.value,
        name: this.qualificationNameFormCtl.value,
        board: this.boardFormCtl.value,
        schoolInstitue: this.schoolInstitueFormCtl.value,
        startYear: datePipe.transform(this.startYearFormCtl.value, 'MM/dd/yyyy'),
        passOutYear: datePipe.transform(this.passOutYearFormCtl.value, 'MM/dd/yyyy'),
        score: this.scoreFormCtl.value,
        highestQualification: null,
      },
      lastEmployeeHistory: {
        id: this.empHistIdFormCtl.value,
        employerName: this.employerNameFormCtl.value,
        address: this.addressFormCtl.value,
        startDate: datePipe.transform(this.startDateFormCtl.value, 'MM/dd/yyyy'),
        endDate: datePipe.transform(this.endDateFormCtl.value, 'MM/dd/yyyy'),
        designation: this.empHistDesignationFormCtl.value,
      }
    }

    if (this.empId) {
      employeePayloadData.id = this.empId
    }

    this.saveOrUpdateHttpObservable(this.empId, employeePayloadData).subscribe(data => {

      this.hasSubmitted = true;
      this.router.navigate(["/employee/" + data["actionMessage"] + "/view"]);

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message
    })

  }

  private saveOrUpdateHttpObservable(empdId: Number, employeePayloadData: IEmployee) {
    if (this.empId) {
      return this.http.put(ApiEndpoint.EMPLOYEES + "/" + empdId, employeePayloadData);
    }
    else {
      return this.http.post(ApiEndpoint.EMPLOYEES, employeePayloadData);
    }
  }

  private setEmployeeForm() {

    this.firstName.setValue(this.employee.firstName)
    this.middleName.setValue(this.employee.middleName)
    this.lastName.setValue(this.employee.lastName)
    this.email.setValue(this.employee.email)
    this.mobileNo.setValue(this.employee.mobileNo)
    this.status.setValue(this.employee.status)
    this.dob.setValue(moment(<string>this.employee.dob))
    this.joiningDate.setValue(moment(<string>this.employee.joiningDate))
    this.employeeType.setValue(this.employee.employeeType)
    this.designation.setValue(this.employee.designation)

    let pinfo = this.employee.personalInfo;
    if (pinfo) {
      this.pid.setValue(pinfo.id)
      this.panCard.setValue(pinfo.panCard)
      this.aadharCard.setValue(pinfo.aadharCard)
      this.voterId.setValue(pinfo.voterId)
      this.drivingLicence.setValue(pinfo.drivingLicence)
    }

    let corAddr = this.employee.correspondentAddress;
    if (corAddr) {
      this.corAddId.setValue(corAddr.id)
      this.corrFirstLine.setValue(corAddr.firstLine)
      this.corrSecondLine.setValue(corAddr.secondLine)
      this.corrCountry.setValue(corAddr.country)
      this.corrState.setValue(corAddr.state)
      this.corrDistrict.setValue(corAddr.district)
    }

    let permAddr = this.employee.permanentAddress;
    if (permAddr) {
      this.permAddId.setValue(permAddr.id)
      this.permtFirstLine.setValue(permAddr.firstLine)
      this.permtSecondLine.setValue(permAddr.secondLine)
      this.permtCountry.setValue(permAddr.country)
      this.permtState.setValue(permAddr.state)
      this.permtDistrict.setValue(permAddr.district)
    }

    let highestQualification = this.employee.highestQualification;
    if (highestQualification) {
      this.acaIdFormCtl.setValue(highestQualification.id)
      this.qualificationNameFormCtl.setValue(highestQualification.name)
      this.boardFormCtl.setValue(highestQualification.board)
      this.schoolInstitueFormCtl.setValue(highestQualification.schoolInstitue)
      this.scoreFormCtl.setValue(highestQualification.score)
      this.startYearFormCtl.setValue(moment(<string>highestQualification.startYear))
      this.passOutYearFormCtl.setValue(moment(<string>highestQualification.passOutYear))
    }

    let lastEmployeeHistory = this.employee.lastEmployeeHistory;
    if (lastEmployeeHistory) {
      this.empHistIdFormCtl.setValue(lastEmployeeHistory.id)
      this.employerNameFormCtl.setValue(lastEmployeeHistory.employerName)
      this.addressFormCtl.setValue(lastEmployeeHistory.address)
      this.startDateFormCtl.setValue(moment(<string>lastEmployeeHistory.startDate))
      this.endDateFormCtl.setValue(moment(<string>lastEmployeeHistory.endDate))
      this.empHistDesignationFormCtl.setValue(lastEmployeeHistory.designation)
    }
  }

}

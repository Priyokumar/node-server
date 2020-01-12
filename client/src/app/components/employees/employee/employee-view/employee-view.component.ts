import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { IDocument, IEmployee } from 'src/app/model/employeeModels';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  errorMessage: String;
  empId: Number;
  employee: IEmployee

  public documentDisplayedColumns: string[] = ["id", "name", "type", "documentName"]
  public documentDataSource: MatTableDataSource<IDocument>
  public documents: IDocument[] = []
  percentage: number
  uploadingFile: boolean
  profilePicUrl: String = "/assets/images/avatar.png"

  panCardUrl: String
  aadhaarCardUrl: String
  voterIdUrl: String
  drivingLicenseUrl: String
  xCertUrl: String
  xIICertUrl: String
  graduationCertUrl: String
  postGraduationCertUrl: String

  constructor(private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService) {
    this.activatedRoute.params.subscribe(params => {
      this.empId = params.empId;
    })
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEES + "/" + this.empId).subscribe(data => {
      resp = data;
      this.employee = resp.data;

      this.profilePicUrl = ApiEndpoint.DOCUMENT + "/" + this.employee.profilePic.id + "/view"
      let personalInfo = this.employee.personalInfo
      if (personalInfo) {
        if (personalInfo.panCardDoc)
          this.panCardUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.panCardDoc.id + "/view"
        if (personalInfo.aadharCardDoc)
          this.aadhaarCardUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.aadharCardDoc.id + "/view"
        if (personalInfo.voterIdDoc)
          this.voterIdUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.voterIdDoc.id + "/view"
        if (personalInfo.drivingLicenceDoc)
          this.drivingLicenseUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.drivingLicenceDoc.id + "/view"

        if (personalInfo.xCertDoc)
          this.xCertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.xCertDoc.id + "/view"
        if (personalInfo.xIICertDoc)
          this.xIICertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.xIICertDoc.id + "/view"
        if (personalInfo.graduationCertDoc)
          this.graduationCertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.graduationCertDoc.id + "/view"
        if (personalInfo.postGraduationCertDoc)
          this.postGraduationCertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.postGraduationCertDoc.id + "/view"
      }

      console.log(this.employee);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  delete() {

    this.http.delete(ApiEndpoint.EMPLOYEES + "/" + this.empId).subscribe(data => {
      this.router.navigate(["/employee/list"]);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  edit() {
    this.router.navigate(["/employee/" + this.empId + "/edit"]);
  }

  onSelectFile(file: File, type: String) {

    this.fileUploadService.uploadDoc(file, this.empId, "EMPLOYEE", type, type).subscribe(event => {
      console.log(event)
      if (event.type === HttpEventType.UploadProgress) {
        this.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {

        this.uploadingFile = false
        let body: string | any = <string>event.body
        body = JSON.parse(body);

        let docUrl = ApiEndpoint.DOCUMENT + "/" + body.actionMessage + "/view"
        this.setDocUrl(type, docUrl)
        // this.fileUploadService.sendDocUrl(this.docUrl)
        console.log("File has been uploaded")
      }
    }, error => {
      console.error(error)
    })

  }

  setDocUrl(type: String, docUrl: String) {

    if (type === "PROFILE_PIC")
      this.profilePicUrl = docUrl
    else if (type === "PAN_CARD")
      this.panCardUrl = docUrl
    else if (type === "AADHAAR_CARD")
      this.aadhaarCardUrl = docUrl
    else if (type === "VOTER_ID")
      this.voterIdUrl = docUrl
    else if (type === "DRIVING_LICENSE")
      this.drivingLicenseUrl = docUrl

    else if (type === "X_CERT")
      this.xCertUrl = docUrl
    else if (type === "XII_CERT")
      this.xIICertUrl = docUrl
    else if (type === "GRADUATION_CERT")
      this.graduationCertUrl = docUrl
    else if (type === "POST_GRADUATION_CERT")
      this.postGraduationCertUrl = docUrl

  }

  editDoc(type: String) {
    if (type === "PROFILE_PIC")
      this.profilePicUrl = null
    else if (type === "PAN_CARD")
      this.panCardUrl = null
    else if (type === "AADHAAR_CARD")
      this.aadhaarCardUrl = null
    else if (type === "VOTER_ID")
      this.voterIdUrl = null
    else if (type === "DRIVING_LICENSE")
      this.drivingLicenseUrl = null

    else if (type === "X_CERT")
      this.xCertUrl = null
    else if (type === "XII_CERT")
      this.xIICertUrl = null
    else if (type === "GRADUATION_CERT")
      this.graduationCertUrl = null
    else if (type === "POST_GRADUATION_CERT")
      this.postGraduationCertUrl = null
  }

  cancel(type: String) {
    let personalInfo = this.employee.personalInfo
    if (personalInfo) {


      if (personalInfo.panCardDoc && type === "PAN_CARD")
        this.panCardUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.panCardDoc.id + "/view"

      if (personalInfo.aadharCardDoc && type === "AADHAAR_CARD")
        this.aadhaarCardUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.aadharCardDoc.id + "/view"

      if (personalInfo.voterIdDoc && type === "VOTER_ID")
        this.voterIdUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.voterIdDoc.id + "/view"

      if (personalInfo.drivingLicenceDoc && type === "DRIVING_LICENSE")
        this.drivingLicenseUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.drivingLicenceDoc.id + "/view"


      if (personalInfo.xCertDoc && type === "X_CERT")
        this.xCertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.xCertDoc.id + "/view"

      if (personalInfo.xIICertDoc && type === "XII_CERT")
        this.xIICertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.xIICertDoc.id + "/view"

      if (personalInfo.graduationCertDoc && type === "GRADUATION_CERT")
        this.graduationCertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.graduationCertDoc.id + "/view"

      if (personalInfo.postGraduationCertDoc && type === "POST_GRADUATION_CERT")
        this.postGraduationCertUrl = ApiEndpoint.DOCUMENT + "/" + personalInfo.postGraduationCertDoc.id + "/view"
    }
  }

}

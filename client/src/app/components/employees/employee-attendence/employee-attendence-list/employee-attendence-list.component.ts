import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IRole } from 'src/app/model/security';
import { Router } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { IEmployeeAttendence } from 'src/app/model/employeeModels';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-attendence-list',
  templateUrl: './employee-attendence-list.component.html',
  styleUrls: ['./employee-attendence-list.component.css']
})
export class EmployeeAttendenceListComponent implements OnInit {


  public errorMessage: String;
  public empAttdColumns: string[] = ["id", "date", "action"];
  public empAttdDataSource: MatTableDataSource<IEmployeeAttendence>;
  public empAttds: IEmployeeAttendence[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getEmpAttds();
  }

  private getEmpAttds() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEE_ATTENDENCES).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.empAttds = resp.data;
        this.empAttdDataSource = new MatTableDataSource(this.empAttds);

        if (!this.empAttds)
          this.errorMessage = "No attendence found";

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

  public onClickRow(empAttdId: Number) {

    this.router.navigate(["/employee/attendences/" + empAttdId + "/view"]);

  }

  public onDeleteRow(empAttdId: Number) {

    this.http.delete(ApiEndpoint.EMPLOYEE_ATTENDENCES + "/" + empAttdId).subscribe(data => {
      this.empAttdDataSource = new MatTableDataSource([])
      this.getEmpAttds();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { DocumentBody } from './file-upload.service';
import { ApiEndpoint } from '../model/apiEndpoint';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  uploadEmployeePhoto(file: File, empId: Number): Observable<HttpEvent<{}>> {

    let formdata: FormData = new FormData();

    let documentBody: DocumentBody = {
      docFor: "EMPLOYEE",
      name: "Photo",
      type: "PHOTO"
    }

    formdata.append('file', file)
    formdata.append("documentBody", JSON.stringify(documentBody))

    const req = new HttpRequest('POST', ApiEndpoint.EMPLOYEES + "/" + empId + "/upload", formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req)
  }

}

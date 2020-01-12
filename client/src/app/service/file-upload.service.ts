import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiEndpoint } from '../model/apiEndpoint';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>()

  sendDocUrl(docUrl: String) {
    this.subject.next({ docUrl: docUrl })
  }

  getDocUrl(): Observable<any> {
    return this.subject.asObservable()
  }

  uploadDoc(file: File, id: Number, docFor: String, type: String, name: String): Observable<HttpEvent<{}>> {

    let formdata: FormData = new FormData();

    let documentBody: DocumentBody = {
      docFor: docFor,
      name: name,
      type: type
    }

    formdata.append('file', file)
    formdata.append("documentBody", JSON.stringify(documentBody))

    let url = ApiEndpoint.DOCUMENT + "/" + id + "/upload"
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req)
  }

  public getExtension(fileName: String) {
    let splits = fileName.split(".")
    return "." + splits[splits.length - 1]
  }

}

export interface DocumentBody {

  docFor: String
  type: String
  name: String

}

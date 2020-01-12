import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public change(value: boolean) {
    this.loaderSubject.next(value);
  }

  public status() {
    return this.loaderSubject.asObservable();
  }

}

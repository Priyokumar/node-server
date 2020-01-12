import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public yearsLtCurrentYear(count: Number): String[] {

    let currentYear = new Date().getFullYear()

    let years: String[] = []

    for (let i = 0; i < count; i++) {
      if (i != 0)
        currentYear -= 1;
      years.push(currentYear + "")
    }

    return years
  }

}

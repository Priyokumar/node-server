import { Component } from '@angular/core'
import { UserServiceService } from './service/user-service.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hasLoginedObs: Observable<Boolean>

  constructor(public userService: UserServiceService) {
      this.hasLoginedObs = this.userService.hasLoginedObs()
  }

}

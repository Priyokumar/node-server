import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { SideNavServiceService } from 'src/app/service/side-nav-service.service'
import { ApiEndpoint } from 'src/app/model/apiEndpoint'
import { HttpClient } from '@angular/common/http'
import { IUser, IRole, IMenu } from 'src/app/model/security'
import { UserServiceService } from 'src/app/service/user-service.service'

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit, OnDestroy {
 
  showFiller = false

  opened = true
  mode = 'side'
  expandHeight = '42px'
  collapseHeight = '42px'
  displayMode = 'flat'
  overlap = false

  errorMessage: String
  roles: IRole[]

  watcher: Subscription

  public sideNavs: IMenu[] = []
  public user: IUser;
  rolesSubscription: Subscription;

  constructor(media: MediaObserver,
    private userService: UserServiceService,
    private sideNavService: SideNavServiceService,
    private http: HttpClient) {

    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false
        this.mode = 'over'
      } else {
        this.opened = true
        this.mode = 'side'
      }
    })
  }

  ngOnInit() {
    this.user = this.userService.loginUser()
    this.getRoles()
  }

  getRoles() {

    this.rolesSubscription = this.http.get(ApiEndpoint.SECURITY + "/" + this.user.id + "/roles").subscribe(data => {

      this.roles = data["data"]
      let menus = this.sideNavService.getMenusByRoles(this.roles)
      this.sideNavs = menus

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  logout() {
    this.userService.logout()
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe()
    this.rolesSubscription.unsubscribe()
  }

}

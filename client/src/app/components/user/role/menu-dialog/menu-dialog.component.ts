import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material'
import { IMenu } from 'src/app/model/security'
import { allSideNavs, SideNavServiceService } from 'src/app/service/side-nav-service.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {

  public actionMode = "CREATE"
  public menuForm: FormGroup

  public subMenuColumns: string[] = ["id", "title", "order", "icon", "action"]
  public subMenuDataSource: MatTableDataSource<IMenu>
  public subMenus: IMenu[] = []
  public menus: IMenu[] = allSideNavs
  public subMenusSelect: IMenu[] = []
  public hasSubMenus = [{ key: true, value: "Yes" }, { key: false, value: "No" }]

  constructor(
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMenu, private sideNavService: SideNavServiceService) {

    dialogRef.disableClose = true

    this.menuForm = new FormGroup({
      "orderFctrl": this.orderFctrl,
      "pathFctrl": this.pathFctrl,
      "titleFctrl": this.titleFctrl,
      "iconFctrl": this.iconFctrl,
      "hasSubmenuFctrl": this.hasSubmenuFctrl
    })

    if (data) {
      this.actionMode = "EDIT"
      this.orderFctrl.setValue(data.order)
      this.pathFctrl.setValue(data.path)
      this.titleFctrl.setValue(data.title)
      this.iconFctrl.setValue(data.icon)
      this.hasSubmenuFctrl.setValue(data.hasSubmenu)
      this.subMenus = data.submenu
      this.subMenuDataSource = new MatTableDataSource(this.subMenus)
    }

    this.idFctrl.valueChanges.subscribe(data => {

      this.subMenus = []
      this.subMenuDataSource = new MatTableDataSource(this.subMenus)
      let menu = allSideNavs.find(menu => { return menu.id == data })
      this.orderFctrl.setValue(menu.order)
      this.pathFctrl.setValue(menu.path)
      this.titleFctrl.setValue(menu.title)
      this.iconFctrl.setValue(menu.icon)
      this.hasSubmenuFctrl.setValue(menu.hasSubmenu)
      this.subMenusSelect = menu.submenu

      if (menu.hasSubmenu === false){
        this.subMenuFctrl.setValidators(null)
        this.subMenuFctrl.updateValueAndValidity()
      }

    })

    this.orderFctrl.disable()
    this.pathFctrl.disable()
    this.titleFctrl.disable()
    this.iconFctrl.disable()
    this.hasSubmenuFctrl.disable()

  }

  idFctrl = new FormControl(null, Validators.required)
  orderFctrl = new FormControl(null, Validators.required)
  pathFctrl = new FormControl(null, Validators.required)
  titleFctrl = new FormControl(null, Validators.required)
  iconFctrl = new FormControl(null, Validators.required)
  hasSubmenuFctrl = new FormControl(null, Validators.required)
  subMenuFctrl = new FormControl(null, Validators.required)

  ngOnInit() {
  }

  public add() {

    let menu: IMenu = {
      id: this.idFctrl.value,
      icon: this.iconFctrl.value,
      order: this.orderFctrl.value,
      path: this.pathFctrl.value,
      title: this.titleFctrl.value,
      hasSubmenu: this.hasSubmenuFctrl.value,
      submenu: this.subMenus,
    }

    this.dialogRef.close(menu)
  }

  public cancel() {
    this.dialogRef.close()
  }

  onDelete(index: number) {
    this.subMenusSelect.push(this.subMenus[index])
    this.subMenus.splice(index, 1)
    this.subMenuDataSource = new MatTableDataSource(this.subMenus)
  }

  addSubMenu() {

    let subMenu = <IMenu>this.subMenuFctrl.value

    let index = this.subMenus.findIndex(data => { return data.id == subMenu.id })
    if (index < 0 && subMenu.id) {
      this.subMenus.push(subMenu)
      this.subMenuDataSource = new MatTableDataSource(this.subMenus)
    }
    this.subMenusSelect = this.subMenusSelect.filter(data => { return data.id != subMenu.id })

  }

}

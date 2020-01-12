import { Component, OnInit, Inject } from '@angular/core';
import { IMenu } from 'src/app/model/security';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-menu-view-dialog',
  templateUrl: './menu-view-dialog.component.html',
  styleUrls: ['./menu-view-dialog.component.css']
})
export class MenuViewDialogComponent implements OnInit {


  public subMenuColumns: string[] = ["id", "title", "order", "icon"]
  public subMenuDataSource: MatTableDataSource<IMenu>
  public subMenus: IMenu[] = []
  menu: IMenu

  constructor(
    public dialogRef: MatDialogRef<MenuViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMenu) {

    this.subMenus = data.submenu
    this.subMenuDataSource = new MatTableDataSource(this.subMenus)
  }

  ngOnInit() {

  }

  public cancel() {
    this.dialogRef.close()
  }

}

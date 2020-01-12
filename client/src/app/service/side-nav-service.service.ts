import { Injectable } from '@angular/core';
import { IRole, IMenu } from '../model/security';

@Injectable({
  providedIn: 'root'
})
export class SideNavServiceService {

  constructor() { }

  public getMenusByRoles(roles: IRole[]): IMenu[] {

    if (!roles)
      return null
    let allMenus: IMenu[] = []
    roles.forEach(role => {
      let menus = role.menus
      if (menus) {
        menus.forEach(menu => {
          allMenus.push(menu)
        })
      }
    })
    let filterMenus: IMenu[] = []
    allMenus.forEach(menu => {
      if (filterMenus.length == 0)
        filterMenus.push(menu)
      else {
        let index = filterMenus.findIndex(elmnt => { return elmnt.title == menu.title })
        if (index >= 0) {
          if (menu.hasSubmenu) {
            let dedupMenu = filterMenus[index]
            menu.submenu.forEach(submenu => {
              if (dedupMenu.submenu) {
                let ddindx = dedupMenu.submenu.findIndex(dedupSubmenu => { return dedupSubmenu.title == submenu.title })
                if (ddindx < 0)
                  dedupMenu.submenu.push(submenu)
              }
            })
          }
        } else
          filterMenus.push(menu)
      }
    })
    filterMenus.forEach(elmnt => {
      if (elmnt.submenu)
        elmnt.submenu.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
    })
    filterMenus.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
    return filterMenus
  }
}



export const allSideNavs: IMenu[] = [

  { id: 1, order: 1, path: "/dashboard", title: "Dashboard", icon: "dashboard", hasSubmenu: false, submenu: [] },

  {
    id: 2, order: 2, path: "", title: "Employee Management", icon: "account_box", hasSubmenu: true, submenu:
      [
        { id: 1, order: 1, path: "/employee/list", title: "Employee", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 2, order: 2, path: "/employee/attendence-list", title: "Attendence", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 3, order: 3, path: "/employee/salaries", title: "Salary", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 4, order: 4, path: "/employee/pay-salaries", title: "Salary payment", icon: "dashboard", hasSubmenu: false, submenu: [] },
      ]
  },

  {
    id: 3, order: 3, path: "", title: "Student Management", icon: "wc", hasSubmenu: true, submenu:
      [
        { id: 1, order: 1, path: "/student/list", title: "Student", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 2, order: 2, path: "/student/admissions", title: "Admission", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 3, order: 3, path: "/student/attendences", title: "Attendence", icon: "dashboard", hasSubmenu: false, submenu: [] },
      ]
  },

  {
    id: 4, order: 4, path: "", title: "Incomes & Expenses", icon: "dashboard", hasSubmenu: true, submenu:
      [
        { id: 4, order: 4, path: "/income-expense/expenses", title: "Expense", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 5, order: 5, path: "/income-expense/incomes", title: "Income", icon: "dashboard", hasSubmenu: false, submenu: [] },
      ]
  },

  {
    id: 5, order: 5, path: "", title: "Maintenance", icon: "enhanced_encryption", hasSubmenu: true, submenu:
      [
        { id: 1, order: 1, path: "/maintenance/admission-fees", title: "Admission Fee Structure", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 2, order: 2, path: "/maintenance/classes", title: "Class", icon: "dashboard", hasSubmenu: false, submenu: [] },
      ]
  },

  {
    id: 6, order: 6, path: "", title: "Security", icon: "fingerprint", hasSubmenu: true, submenu:
      [
        { id: 1, order: 1, path: "/security/users", title: "User", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 2, order: 2, path: "/security/user-audit", title: "Usern Audit", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 3, order: 3, path: "/security/change-password", title: "Change Password", icon: "dashboard", hasSubmenu: false, submenu: [] },
        { id: 4, order: 4, path: "/security/roles", title: "Roles", icon: "dashboard", hasSubmenu: false, submenu: [] },
      ]
  },

]

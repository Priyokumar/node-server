import React, { Component, Fragment } from 'react'
import "./sidenav.scss"
import { navLinks, getRandomColor } from "../layout/navlinks"
import { Link } from "react-router-dom"


class SideNav extends Component {
  state = {
    selectedIndex: -1
  }
  render() {
    return (
      <div>
        <ul className="nav flex-column pl-3" style={{ "height": "92vh" }}>
          {
            navLinks.map((navlink, navlinkIndex) => {
              return (
                <Fragment key={navlinkIndex}>
                  {
                    navlink.hasSubMenus ? (

                      <li className="cursor-pointer" onClick={() => {

                        let selectedIndex = this.state.selectedIndex === -1 ? navlinkIndex : -1
                        this.setState({ selectedIndex: selectedIndex })

                      }}>

                        <div className="row justify-content-around" data-toggle="collapse" data-target={"#collapse" + navlinkIndex}>
                          <div className="col-md-9 pt-2 pl-1 text-left">
                            <button to={navlink.link} className="navLink no-style-btn">
                              <i className={navlink.icon} style={{ color: getRandomColor() }}></i>&nbsp;&nbsp; {navlink.name}
                            </button>
                          </div>
                          <div className="col-md-2 p-0" style={{ "lineHeight": "40px" }}>
                            {
                              this.state.selectedIndex === navlinkIndex ? (
                                <i className="fas fa-angle-up"></i>
                              ) : (
                                  <i className="fas fa-angle-down"></i>
                                )
                            }

                          </div>
                        </div>

                        <ul id={"collapse" + navlinkIndex} className="collapse">
                          {navlink.subMenus.map((subMenu, subMenuIndex) => {
                            return (
                              <li key={subMenuIndex} className="nav-item sub-menu-li p-2">
                                <Link to={subMenu.link}>
                                  <i className={subMenu.icon} style={{ color: getRandomColor() }}></i>&nbsp;&nbsp; {subMenu.name}
                                </Link>
                              </li>
                            )
                          })}

                        </ul>
                      </li>
                    ) : (
                        <li className="nav-item p-2">
                          <Link to={navlink.link}>
                            <i className={navlink.icon} style={{ color: getRandomColor() }}></i>&nbsp;&nbsp; {navlink.name}
                          </Link>
                        </li>
                      )
                  }
                </Fragment>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SideNav;
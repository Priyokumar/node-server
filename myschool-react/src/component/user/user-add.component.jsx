import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Select } from 'react-inputs-validation'
import { modalService } from "../../service/modal.service"
import EmployeeSearch from "./employee-search.component"
import { getRoles, addUser } from "../../service/user.service"
import { alertService } from "../../service/alert.service"

class AddUpdateUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      employee: null,
      role: "",
      roles: []
    }
  }

  componentDidMount() {
    modalService.afterClosed().subscribe(data => {
      if (data && data.type === "search_employee") {
        let employee = data.employee
        this.setState({ employee: employee })
        console.log(employee)
      }
    })
    this.getRoles()
  }

  async getRoles() {
    try {
      let roles = await getRoles()
      let newRoles = []
      if (roles && roles.length > 0) {
        roles.forEach(role => {
          let newRole = { id: role._id, name: role.name }
          newRoles.push(newRole)
        })
      }
      this.setState({ roles: newRoles })
    } catch (error) {
      console.log(error)
      alertService.sendAlert({ type: "danger", message: error.message })
    }
  }

  openSearchEmployeeModal() {
    modalService.open({ Component: EmployeeSearch, data: {}, modalConfig: { title: "Search Employee", size: "lg" } })
  }

  async addUser() {

    try {
      let reqBody = {
        name: this.state.employee.firstName + " " + this.state.employee.middleName + " " + this.state.employee.lastName,
        email: this.state.employee.email,
        empId: this.state.employee._id,
        role: this.state.role,
        mobileNo: this.state.employee.mobileNo
      }
      await addUser(reqBody)
      alertService.sendAlert({ type: "success", message: "User has successfully created" })
      this.props.history.push("/module/users")

    } catch (error) {
      console.log(error)
      let message = "Something went wrong ):"
      if (error.response.status === 409)
        message = error.response.data
      alertService.sendAlert({ type: "danger", message: message })
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row breadcrumb-row mt-1 mb-2">
          <div className="col-md-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                  Add Users
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-md-6 text-right action-col">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { this.addUser() }}>Save</button>
            &nbsp;
            <button type="button" className="btn btn-warning btn-sm">
              <Link to={"/module/users"} className="breadcrumb-link">Cancel</Link>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 pl-0 pr-0">
            <div className="page-conatiner pl-5 pr-5 pt-4">
              <div className="row">

                <div className="col-md-12">
                  <button className="btn btn-outline-secondary" type="button" onClick={() => { this.openSearchEmployeeModal() }}>Select Employee</button>
                </div>
                <br />
                <br />
                {this.state.employee && (
                  <Fragment>
                    <div className="col-md-12 pb-1">
                      <span className="lead">Employee Details</span>
                      <hr />
                    </div>
                    <div className="col-md-12">
                      <div>
                        <span className="lead">{this.state.employee.firstName} {this.state.employee.middleName} {this.state.employee.lastName}</span>
                      </div>
                      <div>
                        <span>Gender : {this.state.employee.gender}</span>
                      </div>
                      <div>
                        <span>Status : {this.state.employee.status}</span>
                      </div>
                      <div>
                        <span>Employee Type : {this.state.employee.employeeType}</span>
                      </div>
                      <div>
                        <span>Designation : {this.state.employee.designation}</span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <hr />
                      <br />
                    </div>
                    <div className="col-md-4">
                      <label>Role</label>
                      <Select
                        name={'role'}
                        value={this.state.role}
                        optionList={this.state.roles}
                        onChange={(role, e) => { this.setState({ role }) }}
                        onBlur={() => { }}
                        customStyleOptionListContainer={{
                          maxHeight: '200px',
                          overflow: 'auto',
                          fontSize: '14px'
                        }}
                        validationOption={{
                          name: 'Role',
                          check: true,
                          required: false
                        }} />
                    </div>
                  </Fragment>
                )}

              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AddUpdateUser;
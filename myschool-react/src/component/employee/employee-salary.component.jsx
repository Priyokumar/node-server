import React, { Component, Fragment } from 'react'
import { alertService } from "../../service/alert.service"
import { updateEmployee, getEmployees } from "../../service/employee.service"

class EmployeeSalary extends Component {
    state = {
        employees: [],
        salary: "",
        selectedIndex: -1,
    }

    async componentDidMount() {
        try {
            let employees = await getEmployees()
            this.setState({ employees: employees })
        } catch (error) {
            alertService.sendAlert({ type: "danger", message: error.message })
            console.log(error)
        }
    }

    onClickUpdateSalary(index) {
        this.setState({
            selectedIndex: index
        })
    }

    async updateSalary(employee) {
        employee.salary = this.state.salary
        try {
            await updateEmployee(employee._id, employee)
            let employees = await getEmployees()
            this.setState({ employees: employees, selectedIndex: -1 })
            alertService.sendAlert({ type: "success", message: "Salary has been successfully updated" })
        } catch (error) {
            alertService.sendAlert({ type: "danger", message: error.message })
            console.log(error)
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
                                    Employee Salary
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 pl-0 pr-0">
                        <div className="page-conatiner pl-5 pr-5 pt-4">

                            <table className="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Salary</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this
                                            .state
                                            .employees
                                            .map((employee, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{employee.firstName} {employee.middleName} {employee.lastName}</td>
                                                        <td>
                                                            {employee.salary ? (
                                                                <span>{employee.salary}</span>
                                                            ) :
                                                                (
                                                                    <span>NA</span>
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            {this.state.selectedIndex !== index && (
                                                                <div style={{ "display": "flex", "flexDirection": "row" }}>
                                                                    <span>
                                                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => { this.onClickUpdateSalary(index) }}>Update salary</button>
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {this.state.selectedIndex === index &&
                                                                <div class="input-group">
                                                                    <input type="number" class="form-control" placeholder="Salary" onChange={(e) => {
                                                                        this.setState({ salary: e.target.value })
                                                                    }} />
                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-success" type="button" onClick={() => { this.updateSalary(employee) }}>Update</button>
                                                                    </div>
                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-danger" type="button" onClick={() => {
                                                                            this.setState({
                                                                                selectedIndex: -1
                                                                            })
                                                                        }}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EmployeeSalary;
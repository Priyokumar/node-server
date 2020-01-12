import React, { Component, Fragment } from 'react'
import { getEmployees, deleteEmployee } from "../../service/employee.service"
import { Link } from "react-router-dom"


class Employees extends Component {

    state = {
        employees: [],
        isLoading: false,
        hasError: false,
        hasSucceeded: false
    }

    async componentDidMount() {
        this.getEmployees()
    }

    async getEmployees() {
        try {
            this.setState({
                hasError: false,
                isLoading: true
            })
            let employees = await getEmployees()
            this.setState({
                isLoading: false,
                employees: employees
            })
        } catch (error) {
            this.setState({
                hasError: true,
                isLoading: false
            })
            console.log(error)
        }
    }

    async deleteEmployee(employee) {
        try {
            await deleteEmployee(employee._id)
            this.getEmployees()
        } catch (error) {
            console.log(error)
        }
    }

    viewEmployee(id) {
        this.props.history.push("/module/employees/" + id + "/view")
    }

    render() {
        return (
            <Fragment>
                <div className="row breadcrumb-row mt-1 mb-2">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    Employees
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 text-right action-col">
                        <button type="button" className="btn btn-secondary btn-sm"><Link to="/module/employees/add" className="breadcrumb-link">Add Employee</Link></button>
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
                                        <th scope="col">Gender</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Mobile No.</th>
                                        <th scope="col">Status</th>
                                        <th scope="col"></th>
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
                                                        <th className="cursor-pointer" onClick={() => { this.viewEmployee(employee._id) }} scope="row">{index + 1}</th>
                                                        <td className="cursor-pointer" onClick={() => { this.viewEmployee(employee._id) }}>{employee.firstName + " " + employee.middleName + " " + employee.lastName}</td>
                                                        <td>{employee.gender}</td>
                                                        <td>{employee.email}</td>
                                                        <td>{employee.mobileNo}</td>
                                                        <td>{employee.status}</td>
                                                        <td><i className="fas fa-trash-alt cursor-pointer" onClick={() => {
                                                            this.deleteEmployee(employee)
                                                        }}></i></td>
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

export default Employees;
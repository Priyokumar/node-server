import React, { Component, Fragment } from 'react'
import { getEmployees } from "../../service/employee.service"

class EmployeeSearch extends Component {
    state = {
        employees: [],
        isLoading: false,
        hasError: false,
        hasSucceeded: false
    }

    componentDidMount() {
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

    close() {
        this.props.close()
    }

    select(employee) {

        let data = {
            type: "search_employee",
            employee: employee
        }

        this.props.close(data)
    }

    render() {
        return (

            <Fragment>
                <div className="col text-right p-0">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search employee by name" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" ><i className="fas fa-search"></i>Search</button>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Employee Name</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Employee Type</th>
                            <th>Designation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map((employee, index) => {
                                return (
                                    <tr className="tr-hover cursor-pointer" key={index} onClick={() => { this.select(employee) }}>
                                        <td>{employee.firstName} {employee.middleName} {employee.lastName}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.status}</td>
                                        <td>{employee.employeeType}</td>
                                        <td>{employee.designation}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default EmployeeSearch;
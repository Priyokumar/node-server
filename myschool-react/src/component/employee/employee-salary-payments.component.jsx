import React, { Component, Fragment } from 'react'
import { alertService } from "../../service/alert.service"
import { getEmployeeSalaryPayments, deleteEmployeeSalaryPayment } from "../../service/employee-salary-payment.service"
import { Link } from "react-router-dom"


class EmployeeSalary extends Component {
    state = {
        employeeSalaryPayments: []
    }

    async componentDidMount() {
        try {
            let employeeSalaryPayments = await getEmployeeSalaryPayments()
            this.setState({ employeeSalaryPayments: employeeSalaryPayments })
        } catch (error) {
            alertService.sendAlert({ type: "danger", message: error.message })
            console.log(error)
        }
    }

    async deletePayment(payment) {
        try {
            await deleteEmployeeSalaryPayment(payment._id)
            alertService.sendAlert({ type: "success", message: "Payment has been successfully deleted" })
        } catch (error) {
            alertService.sendAlert({ type: "danger", message: error.message })
            console.log(error)
        }
    }

    getEmployeeName(employeeSalaryPayment) {
        if (!employeeSalaryPayment.employee)
            return ""
        return employeeSalaryPayment.employee.firstName + " " + employeeSalaryPayment.employee.middleName + " " + employeeSalaryPayment.employee.lastName
    }


    render() {
        return (
            <Fragment>
                <div className="row breadcrumb-row mt-1 mb-2">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    Employee Salary Payment
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 text-right action-col">
                        <button type="button" className="btn btn-secondary btn-sm"><Link to="/module/employees/salary-payments/add" className="breadcrumb-link">Add New Payment</Link></button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 pl-0 pr-0">
                        <div className="page-conatiner pl-5 pr-5 pt-4">


                            {this.state.employeeSalaryPayments.length > 0 ? (
                                <table className="table table-hover border">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Year</th>
                                            <th scope="col">Month</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this
                                                .state
                                                .employeeSalaryPayments
                                                .map((employeeSalaryPayment, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{this.getEmployeeName(employeeSalaryPayment)}</td>
                                                            <td>{employeeSalaryPayment.amount}</td>
                                                            <td>{employeeSalaryPayment.year}</td>
                                                            <td>{employeeSalaryPayment.month}</td>
                                                            <td> <i className="fas fa-trash-alt cursor-pointer" onClick={() => {
                                                                this.deletePayment(employeeSalaryPayment)
                                                            }}></i></td>
                                                        </tr>
                                                    )
                                                })}
                                    </tbody>


                                </table>
                            ) : (
                                    <div className="text-center">No payment record</div>
                                )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EmployeeSalary;
import React, { Component, Fragment } from 'react'
import { getEmployeeSalaryPayment, saveEmployeeSalaryPayment, updateEmployeeSalaryPayment } from "../../service/employee-salary-payment.service"
import { alertService } from "../../service/alert.service"
import { Link } from 'react-router-dom'
import { Textbox, Select, Textarea } from 'react-inputs-validation'
import EmployeeSearch from "../user/employee-search.component"
import { modalService } from "../../service/modal.service"

const years = [
    { id: 1, name: 2018 },
    { id: 2, name: 2019 }
];

const months = [

    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" }

];

class EmployeeSalaryPaymentAddEdit extends Component {

    state = {
        id: "",
        employee: null,
        year: "",
        month: "",
        amount: "",
        comments: ""
    }

    componentDidMount() {

        modalService.afterClosed().subscribe(data => {
            if (data && data.type === "search_employee") {
                let employee = data.employee
                this.setState({ employee: employee })
                console.log(employee)
            }
        })
        let id = this.props.match.params.id
        if (id)
            this.getEditData(id)
    }

    openSearchEmployeeModal() {
        modalService.open({ Component: EmployeeSearch, data: {}, modalConfig: { title: "Search Employee", size: "lg" } })
    }

    async getEditData(id) {

        try {
            let payment = await getEmployeeSalaryPayment(id)
            this.setState({
                id: payment.employee._id,
                employee: payment.employee,
                year: payment.year,
                month: payment.month,
                amount: payment.amount,
                comments: payment.comments
            })
            alertService.sendAlert({ type: "success", message: "Salary has been successfully updated" })
        } catch (error) {
            alertService.sendAlert({ type: "danger", message: error.message })
            console.log(error)
        }
    }

    async saveOrUpdate() {

        try {

            let reqBody = {
                employee: this.employee._id,
                year: this.state.year,
                month: this.state.month,
                amount: this.state.amount,
                comments: this.state.comments
            }

            if (this.state.id) {
                await saveEmployeeSalaryPayment(reqBody)
                alertService.sendAlert({ type: "success", message: "Salary payment has been successfully updated" })
            }

            else {
                await updateEmployeeSalaryPayment(this.state.id, reqBody)
                alertService.sendAlert({ type: "success", message: "Salary payment has been successfully saved" })
            }

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
                                    <span>Add New Payment</span>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="col-md-6 text-right action-col">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => { this.saveOrUpdate() }}>Save</button>
                        &nbsp;
                                <button type="button" className="btn btn-warning btn-sm">
                            <Link to={"/module/employees/salary-payments"} className="breadcrumb-link">Cancel</Link>
                        </button>
                    </div>
                </div>
                <div className="page-conatiner pl-5 pr-5 pt-4">
                    <div className="row pb-3">
                        <div className="col-md-12 pb-1">
                            <span className="lead">Employee Details</span>
                            <hr />
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-outline-secondary" type="button" onClick={() => { this.openSearchEmployeeModal() }}>Select Employee</button>
                        </div>
                        {this.state.employee && (
                            <Fragment>
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
                                    <label>Year</label>
                                    <Select
                                        tabIndex="1"
                                        id={'year'}
                                        name={'year'}
                                        value={this.state.year}
                                        optionList={years}
                                        onChange={(year, e) => {
                                            this.setState({ year })
                                        }}
                                        onBlur={() => { }}
                                        customStyleOptionListContainer={{
                                            maxHeight: '200px',
                                            overflow: 'auto',
                                            fontSize: '14px'
                                        }}
                                        validationOption={{
                                            name: 'year',
                                            check: true,
                                            required: true
                                        }} />
                                </div>
                                <div className="col-md-4">
                                    <label>Month</label>
                                    <Select
                                        tabIndex="1"
                                        id={'month'}
                                        name={'month'}
                                        value={this.state.month}
                                        optionList={months}
                                        onChange={(month, e) => {
                                            this.setState({ month })
                                        }}
                                        onBlur={() => { }}
                                        customStyleOptionListContainer={{
                                            maxHeight: '200px',
                                            overflow: 'auto',
                                            fontSize: '14px'
                                        }}
                                        validationOption={{
                                            name: 'month',
                                            check: true,
                                            required: true
                                        }} />
                                </div>
                                <div className="col-md-4 pb-3">
                                    <label>Amount</label>
                                    <Textbox
                                        tabIndex="3"
                                        name="amount"
                                        type="number"
                                        value={this.state.amount}
                                        placeholder="Amount"
                                        onChange={(amount, e) => { this.setState({ amount }) }}
                                        validationOption={{
                                            type: 'number',
                                            check: true,
                                            required: true
                                        }} />
                                </div>
                                <div className="col-md-4 pb-3">
                                    <label>Comments</label>
                                    <Textarea
                                        tabIndex="3"
                                        name="comments"
                                        type="text"
                                        value={this.state.comments}
                                        placeholder="Write your comments"
                                        onChange={(comments, e) => { this.setState({ comments }) }}
                                    />
                                </div>
                            </Fragment>
                        )}

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EmployeeSalaryPaymentAddEdit; 
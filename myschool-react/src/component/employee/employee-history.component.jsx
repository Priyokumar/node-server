import React, { Component, Fragment } from 'react'
import { Textbox, Textarea } from 'react-inputs-validation'

class EmployeeHistory extends Component {
    state = {
        employerName: "",
        address: "",
        startFrom: "",
        endTo: "",
        empHistDesignation: ""
    }

    componentDidMount() {

        let employeeHistory = this.props.employeeHistory
        if (employeeHistory) {
            this.setState({
                employerName: employeeHistory.employerName,
                address: employeeHistory.address,
                startFrom: employeeHistory.startFrom,
                endTo: employeeHistory.endTo,
                empHistDesignation: employeeHistory.empHistDesignation
            })
        }
    }

    close(data) {
        this.props.close()
    }

    add() {
        let employeeHistory = this.state

        let data = {
            type: "add_employee_history",
            employeeHistory: employeeHistory
        }

        if (this.props.index !== null && this.props.index !== undefined)
            data.index = this.props.index

        this.props.close({ type: "add_employee_history", data: data })
    }

    render() {
        return (
            <Fragment>

                <div className="row">
                    <div className="col-md-12 pb-1">
                        <span className="lead">Employment Details</span>
                        <hr />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>Employer Name</label>
                        <Textbox
                            name="employerName"
                            value={this.state.employerName}
                            placeholder="Employer Name"
                            onChange={(employerName, e) => { this.setState({ employerName }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                name: 'Employer Name',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>Designation</label>
                        <Textbox
                            name="empHistDesignation"
                            value={this.state.empHistDesignation}
                            placeholder="Designation"
                            onChange={(empHistDesignation, e) => { this.setState({ empHistDesignation }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                name: 'Designation',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>Start From</label>
                        <Textbox
                            name="startFrom"
                            value={this.state.startFrom}
                            placeholder="Start From"
                            onChange={(startFrom, e) => { this.setState({ startFrom }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                type: "number",
                                name: 'Start From',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>End To</label>
                        <Textbox
                            name="endTo"
                            value={this.state.endTo}
                            placeholder="End To"
                            onChange={(endTo, e) => { this.setState({ endTo }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                type: "number",
                                name: 'End To',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                    <div className="col-md-8 pb-3">
                        <label>Address</label>
                        <Textarea
                            name="address"
                            value={this.state.address}
                            placeholder="Enter address"
                            onChange={(address, e) => { this.setState({ address }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                name: 'Address',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col text-right">
                        <button type="button" className="btn btn-danger btn-sm w-15" onClick={() => { this.close() }}>Cancel</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-info btn-sm w-15" onClick={() => { this.add() }}>{this.props.index !== undefined ? "Save" : "Add"}</button>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default EmployeeHistory;
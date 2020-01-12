import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Textbox, Select, Textarea, Radiobox } from 'react-inputs-validation'
import DatePicker from 'react-date-picker'
import { DISTRICTS, GENDERS } from "../../constants/common.constant"
import { EMPLOYEE_DESIGNATION, EMPLOYEE_STATUSES, EMPLOYEE_TYPES } from "../../constants/employee.constant"
import { setInitialState, saveOrUpdateEmployee, getEditData, addAcademicHistory, addDocument } from "../../service/employee.service"
import { modalService } from "../../service/modal.service"
import EmployeeHistory from "../employee/employee-history.component"
import AcademicHistory from "./academic-history.component"


class AddEmployee extends Component {

    constructor(props) {
        super(props)
        setInitialState(this)
    }

    componentDidMount() {
        getEditData(this)
        modalService.afterClosed().subscribe(data => {
            if (data && data.type === "add_employee_history") {
                let index = data.data.index
                if (index !== null && index !== undefined) {
                    let copy = this.state.employeeHistories
                    copy[index] = data.data.employeeHistory
                    this.setState({ employeeHistories: copy })
                }
                else {
                    let employeeHistory = data.data.employeeHistory
                    let cloneArr = this.state.employeeHistories ? this.state.employeeHistories.concat(employeeHistory) : [employeeHistory]
                    this.setState({ employeeHistories: cloneArr })
                }
            }
            else if (data && data.type === "add_academic_history") {
                let index = data.index
                if (index !== null && index !== undefined) {
                    let copy = this.state.academicHistories
                    copy[index] = data.academicHistory
                    this.setState({ academicHistories: copy })
                }
                else {
                    let academicHistory = data.academicHistory
                    let cloneArr = this.state.academicHistories ? this.state.academicHistories.concat(academicHistory) : [academicHistory]
                    this.setState({ academicHistories: cloneArr })
                }
            }
        })
    }

    saveOrUpdateEmployee() {
        saveOrUpdateEmployee(this)
    }

    addAcademicHistory() {
        addAcademicHistory(this)
    }

    addDocument() {
        addDocument(this)
    }

    openModal() {
        modalService.open({ Component: EmployeeHistory, data: {}, modalConfig: { title: "Add Employee History", size: "lg" } })
    }
    openEditModal(index) {
        modalService.open({ Component: EmployeeHistory, data: { index: index, employeeHistory: this.state.employeeHistories[index] }, modalConfig: { title: "Edit Employee History", size: "lg" } })
    }

    openAcademicHistoryModal() {
        modalService.open({ Component: AcademicHistory, data: {}, modalConfig: { title: "Add Academic History", size: "lg" } })
    }
    openAcademicHistoryEditModal(index) {
        modalService.open({ Component: AcademicHistory, data: { index: index, academicHistory: this.state.academicHistories[index] }, modalConfig: { title: "Edit Academic History", size: "lg" } })
    }

    render() {
        return (
            <Fragment>
                <div className="row breadcrumb-row mt-1 mb-2">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    <span>Add New Employee</span>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="col-md-6 text-right action-col">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => { this.saveOrUpdateEmployee() }}>Save</button>
                        &nbsp;
                                <button type="button" className="btn btn-warning btn-sm">
                            <Link to={"/module/employees"} className="breadcrumb-link">Cancel</Link>
                        </button>
                    </div>
                </div>
                {/* ================================================ */}

                <div className="col-md-12 pl-0 pr-0">
                    <div className="page-conatiner pl-5 pr-5 mb-5 pb-5">
                        <div className="col">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#general-details" role="tab" aria-controls="general-details" aria-selected="true">General details </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#address-employee-history" role="tab" aria-controls="address-employee-history" aria-selected="false">Address</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#academic" role="tab" aria-controls="academic" aria-selected="false">Academic Details & Employee history</a>
                                </li>
                            </ul>

                            <div className="tab-content pt-4">
                                <div className="tab-pane fade show active" id="general-details" role="tabpanel" aria-labelledby="general-details-tab">
                                    <div className="row pb-3">
                                        <div className="col-md-12 pb-1">
                                            <span className="lead">General Details</span>
                                            <hr />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>First Name</label>
                                            <Textbox
                                                tabIndex="1"
                                                name="firstName"
                                                type="text"
                                                value={this.state.firstName}
                                                placeholder="First Name"
                                                onChange={(firstName, e) => { this.setState({ firstName }) }}
                                                onBlur={(e) => {
                                                    console.log(e)
                                                }}
                                                validationOption={{
                                                    name: 'First Name',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Middle Name</label>
                                            <Textbox
                                                name="middleName"
                                                type="text"
                                                value={this.state.middleName}
                                                placeholder="Middle Name"
                                                onChange={(middleName, e) => { this.setState({ middleName }) }}
                                                onBlur={(e) => {
                                                    console.log(e)
                                                }}
                                                validationOption={{
                                                    name: 'Middle Name',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Last Name</label>
                                            <Textbox
                                                name="lastName"
                                                type="text"
                                                value={this.state.lastName}
                                                placeholder="Last Name"
                                                onChange={(lastName, e) => { this.setState({ lastName }) }}
                                                onBlur={(e) => {
                                                    console.log(e)
                                                }}
                                                validationOption={{
                                                    name: 'Last Name',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Gender</label>
                                            <Select
                                                name={'gender'}
                                                value={this.state.gender}
                                                optionList={GENDERS}
                                                onChange={(gender, e) => { this.setState({ gender }) }}
                                                onBlur={() => { }}
                                                customStyleOptionListContainer={{
                                                    maxHeight: '200px',
                                                    overflow: 'auto',
                                                    fontSize: '14px'
                                                }}
                                                validationOption={{
                                                    name: 'Gender',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <div className="pb-2">Date of birth</div>
                                            <DatePicker className="w-100"
                                                value={this.state.dob}
                                                onChange={value => {
                                                    this.setState({ dob: value })
                                                }}
                                            />
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Email</label>
                                            <Textbox
                                                name="email"
                                                type="text"
                                                value={this.state.email}
                                                placeholder="Email"
                                                onChange={(email, e) => { this.setState({ email }) }}
                                                onBlur={(e) => {
                                                    console.log(e)
                                                }}
                                                validationOption={{
                                                    type: "email",
                                                    name: 'Email',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Mobile No</label>
                                            <Textbox
                                                name="mobileNo"
                                                type="text"
                                                value={this.state.mobileNo}
                                                placeholder="Mobile No"
                                                onChange={(mobileNo, e) => { this.setState({ mobileNo }) }}
                                                onBlur={(e) => {
                                                    console.log(e)
                                                }}
                                                validationOption={{
                                                    name: 'Mobile No',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Status</label>
                                            <Select
                                                name={'status'}
                                                value={this.state.status}
                                                optionList={EMPLOYEE_STATUSES}
                                                onChange={(status, e) => { this.setState({ status }) }}
                                                onBlur={() => { }}
                                                customStyleOptionListContainer={{
                                                    maxHeight: '200px',
                                                    overflow: 'auto',
                                                    fontSize: '14px'
                                                }}
                                                validationOption={{
                                                    name: 'country',
                                                    check: true,
                                                    required: false
                                                }} />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <div className="pb-2">Joining Date</div>
                                            <DatePicker className="w-100"
                                                value={this.state.joiningDate}
                                                onChange={value => {
                                                    this.setState({ joiningDate: value })
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Employee Type</label>
                                            <Select
                                                name={'employeeType'}
                                                value={this.state.employeeType}
                                                optionList={EMPLOYEE_TYPES}
                                                onChange={(employeeType, e) => { this.setState({ employeeType }) }}
                                                onBlur={() => { }}
                                                customStyleOptionListContainer={{
                                                    maxHeight: '200px',
                                                    overflow: 'auto',
                                                    fontSize: '14px'
                                                }}
                                                validationOption={{
                                                    name: 'Employee Type',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Designation</label>
                                            <Select
                                                name={'designation'}
                                                value={this.state.designation}
                                                optionList={EMPLOYEE_DESIGNATION}
                                                onChange={(designation, e) => { this.setState({ designation }) }}
                                                onBlur={() => { }}
                                                customStyleOptionListContainer={{
                                                    maxHeight: '200px',
                                                    overflow: 'auto',
                                                    fontSize: '14px'
                                                }}
                                                validationOption={{
                                                    name: 'Designation',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Pan No.</label>
                                            <Textbox
                                                name="panCard"
                                                type="text"
                                                value={this.state.panCard}
                                                placeholder="Pan No."
                                                onChange={(panCard, e) => { this.setState({ panCard }) }}
                                                onBlur={(e) => {
                                                    console.log(e)
                                                }}
                                                validationOption={{
                                                    name: 'Pan No.',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Aadhaar No.</label>
                                            <Textbox
                                                name="aadharCard"
                                                type="text"
                                                value={this.state.aadharCard}
                                                placeholder="Pan Card No."
                                                onChange={(aadharCard, e) => { this.setState({ aadharCard }) }}
                                                onBlur={(e) => {
                                                    console.log(e)
                                                }}
                                                validationOption={{
                                                    name: 'Aadhaar No.',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="address-employee-history" role="tabpanel" aria-labelledby="address-employee-history-tab">
                                    <div className="row pb-3">
                                        <div className="col-md-12 pb-1">
                                            <span className="lead">Correspondense Address</span>
                                            <hr />
                                        </div>
                                        <div className="col-md-12 pb-3">
                                            <label>Address Line</label>
                                            <Textarea
                                                name="corrAddressLine"
                                                value={this.state.corrAddressLine}
                                                placeholder="Enter your address line"
                                                onChange={(corrAddressLine, e) => { this.setState({ corrAddressLine }) }}
                                                onBlur={(e) => { }}
                                                validationOption={{
                                                    name: 'Address line',
                                                    check: true,
                                                    required: true,
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Country</label>
                                            <Textbox
                                                disabled
                                                type="text"
                                                value={this.state.corrCountry}
                                            />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>State</label>
                                            <Textbox
                                                disabled
                                                type="text"
                                                value={this.state.corrState}
                                            />
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>District</label>
                                            <Select
                                                name={'corrDistrict'}
                                                value={this.state.corrDistrict}
                                                optionList={DISTRICTS}
                                                onChange={(corrDistrict, e) => { this.setState({ corrDistrict }) }}
                                                onBlur={() => { }}
                                                customStyleOptionListContainer={{
                                                    maxHeight: '200px',
                                                    overflow: 'auto',
                                                    fontSize: '14px'
                                                }}
                                                validationOption={{
                                                    name: 'Designation',
                                                    check: true,
                                                    required: true
                                                }} />
                                        </div>

                                        <div className="col-md-12 pb-1">
                                            <label>Same as correspondense Address</label>
                                            <Radiobox
                                                name="sameAscorrAddress"
                                                value={this.state.sameAscorrAddress}
                                                optionList={[
                                                    { id: true, name: 'Yes' },
                                                    { id: false, name: 'No' }
                                                ]}
                                                onChange={(sameAscorrAddress, e) => {
                                                    this.setState({ sameAscorrAddress })
                                                }}
                                                customStyleContainer={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start'
                                                }}
                                                customStyleOptionListItem={{ marginRight: '20px' }}
                                            />
                                        </div>

                                        {
                                            !this.state.sameAscorrAddress && (
                                                <Fragment>
                                                    <div className="col-md-12 pb-1">
                                                        <span className="lead">Permanent Address</span>
                                                        <hr />
                                                    </div>
                                                    <div className="col-md-12 pb-3">
                                                        <label>Address Line</label>
                                                        <Textarea
                                                            name="permAddressLine"
                                                            value={this.state.permAddressLine}
                                                            placeholder="Enter your address line"
                                                            onChange={(permAddressLine, e) => { this.setState({ permAddressLine }) }}
                                                            onBlur={(e) => { }}
                                                            validationOption={{
                                                                name: 'Address line',
                                                                check: true,
                                                                required: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>Country</label>
                                                        <Textbox
                                                            disabled
                                                            type="text"
                                                            value={this.state.permCountry}
                                                        />
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>State</label>
                                                        <Textbox
                                                            disabled
                                                            type="text"
                                                            value={this.state.permState}
                                                        />
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>District</label>
                                                        <Select
                                                            name={'permDistrict'}
                                                            value={this.state.permDistrict}
                                                            optionList={DISTRICTS}
                                                            onChange={(permDistrict, e) => { this.setState({ permDistrict }) }}
                                                            onBlur={() => { }}
                                                            customStyleOptionListContainer={{
                                                                maxHeight: '200px',
                                                                overflow: 'auto',
                                                                fontSize: '14px'
                                                            }}
                                                            validationOption={{
                                                                name: 'District',
                                                                check: true,
                                                                required: true
                                                            }} />
                                                    </div>
                                                </Fragment>
                                            )
                                        }

                                    </div>

                                </div>


                                <div className="tab-pane fade" id="academic" role="tabpanel" aria-labelledby="academic-tab">
                                    <div className="row pb-3">
                                        <div className="col-md-12 pb-0">
                                            <span className="lead">Employment Details</span>
                                            <hr />
                                        </div>
                                        <div className="col-md-12 pb-1   pl-4 pr-4">
                                            <Radiobox
                                                id="fresherOrExperienced"
                                                name="fresherOrExperienced"
                                                value={this.state.fresherOrExperienced}
                                                optionList={[
                                                    { id: "Fresher", name: 'Fresher' },
                                                    { id: "Experienced", name: 'Experienced' }
                                                ]}
                                                onChange={(fresherOrExperienced, e) => {
                                                    this.setState({ fresherOrExperienced })
                                                }}
                                                customStyleContainer={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start'
                                                }}
                                                customStyleOptionListItem={{ marginRight: '20px' }}
                                            />
                                        </div>
                                        {
                                            this.state.fresherOrExperienced === "Experienced" && (
                                                <Fragment>
                                                    <div className="col-md-12 pb-1">
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                <strong>List of Employment History</strong>
                                                            </div>
                                                            <div className="col-md-4 pr-2 text-right">
                                                                <button type="button" className="btn btn-info btn-sm" onClick={() => { this.openModal() }}>Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12  pl-4 pr-4">
                                                        <table className="table">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Employer Name</th>
                                                                    <th>Start From</th>
                                                                    <th>End To</th>
                                                                    <th>Designation</th>
                                                                    <th>Address</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.employeeHistories && this.state.employeeHistories.map((employeeHistory, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{employeeHistory.employerName}</td>
                                                                                <td>{employeeHistory.startFrom}</td>
                                                                                <td>{employeeHistory.endTo}</td>
                                                                                <td>{employeeHistory.empHistDesignation}</td>
                                                                                <td>{employeeHistory.address}</td>
                                                                                <td>
                                                                                    <i className="fas fa-trash-alt cursor-pointer" style={{ "color": "red" }} onClick={() => {
                                                                                        this.state.employeeHistories.splice(index, 1)
                                                                                        this.setState({ employeeHistories: this.state.employeeHistories })
                                                                                    }}></i>
                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                                                    <i class="fas fa-edit cursor-pointer" onClick={() => { this.openEditModal(index) }}></i>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {!this.state.employeeHistories || this.state.employeeHistories.length === 0 ? (
                                                        <div className="col-md-12 ml-3 mt-2 text-center">
                                                            <div className="text-danger"> No employee history. Add employee history</div>
                                                        </div>
                                                    ) : ("")}
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12 pb-0">
                                            <span className="lead">Academic Details</span>
                                            <hr />
                                        </div>
                                        <div className="col-md-12 pb-1">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <strong>List of Academic History</strong>
                                                </div>
                                                <div className="col-md-4 pr-2 text-right">
                                                    <button type="button" className="btn btn-info btn-sm" onClick={() => { this.openAcademicHistoryModal() }}>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 pl-4 pr-4">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Board</th>
                                                        <th>School / Institute</th>
                                                        <th>Passout Year</th>
                                                        <th>Score</th>
                                                        <th>Highest Qualification</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.academicHistories.map((acaHistory, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{acaHistory.name}</td>
                                                                    <td>{acaHistory.board}</td>
                                                                    <td>{acaHistory.schoolInstitue}</td>
                                                                    <td>{acaHistory.passOutYear}</td>
                                                                    <td>{acaHistory.score}</td>
                                                                    <td>{acaHistory.highestQualification === true ? 'Yes' : 'No'}</td>
                                                                    <td><i className="fas fa-trash-alt cursor-pointer" style={{ "color": "red" }} onClick={() => {
                                                                        this.state.academicHistories.splice(index, 1)
                                                                        this.setState({ academicHistories: this.state.academicHistories })
                                                                    }}></i>
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                                                    <i class="fas fa-edit cursor-pointer" onClick={() => { this.openAcademicHistoryEditModal(index) }}></i>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AddEmployee

import React, { Component, Fragment } from 'react'
import { getEmployee, deleteEmployee } from "../../service/employee.service"
import { Link } from "react-router-dom"
import { Tooltip } from 'reactstrap'
import avatar from "../../images/avatar.png"
import FileUpload from "./file-upload.component"
import { getDocUrl } from "../../utils/common.util"

class EmployeeView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employee: {},
            isLoading: false,
            errorMessage: null,

            backTooltipOpen: false,
            deleteTooltipOpen: false,
            editTooltipOpen: false,
            addTooltipOpen: false,

            avatar: avatar,
            openPhotoUpload: false,
            openAadhaarUpload: false,
            openPanUpload: false,
            openXUpload: false,
            openXIIUpload: false,
            openGraduateUpload: false,
            openPostGraduateUpload: false
        }
        this.formatDate = this.formatDate.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    toggle(type) {


        if (type === "back")
            this.setState({
                backTooltipOpen: !this.state.backTooltipOpen
            })
        else if (type === "edit")
            this.setState({
                editTooltipOpen: !this.state.editTooltipOpen
            })
        else if (type === "delete")
            this.setState({
                deleteTooltipOpen: !this.state.deleteTooltipOpen
            })
        else if (type === "add")
            this.setState({
                addTooltipOpen: !this.state.addTooltipOpen
            })
    }

    componentDidMount() {
        this.getEmployee()
    }

    async getEmployee() {
        try {
            let id = this.props.match.params.id
            this.setState({ errorMessage: null, isLoading: true })
            let employee = await getEmployee(id)

            this.setState({
                employee: employee,
                isLoading: false,
                avatar: employee.photoDocId ? getDocUrl(employee.photoDocId) : avatar,
                openPhotoUpload: employee.photoDocId ? true : false,
                openAadhaarUpload: employee.aadhaarDocId ? true : false,
                openPanUpload: employee.panDocId ? true : false,
                openXUpload: employee.XDocId ? true : false,
                openXIIUpload: employee.XIIDocId ? true : false,
                openGraduateUpload: employee.graduationDocId ? true : false,
                openPostGraduateUpload: employee.postGraduationDocId ? true : false,
            })
        } catch (error) {
            this.setState({ errorMessage: "Oops something went wrong", isLoading: false })
        }
    }

    async deleteEmployee() {
        try {
            await deleteEmployee(this.state.employee._id)
            this.props.location.history.push("/module/employees")
        } catch (error) {
            console.log(error)
        }
    }

    formatDate(date) {

        if (!date)
            return ""
        try {
            return new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }).format(new Date(date))
        } catch (error) {
            return "";
        }
    }

    refresh() {
        this.getEmployee()
    }

    render() {
        return (
            <Fragment>
                <div style={{ "position": "absolute", "top": "9%", "zIndex": "10000", "right": "2%" }}>
                    <img src={this.state.avatar} alt="profile_photo" className="img-thumbnail" width="170" />
                </div>
                <div className="row breadcrumb-row mt-1 mb-2">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    <span>Employee View</span>
                                </li>
                            </ol>
                        </nav>
                    </div>


                    <div className="col-md-6 text-right action-col">
                        <button type="button" className="btn btn-warning btn-sm" id="tooltip-back">
                            <Link to={"/module/employees"} className="breadcrumb-link"><i className="fas fa-long-arrow-alt-left"></i></Link>
                        </button>
                        <Tooltip placement="bottom" isOpen={this.state.backTooltipOpen} target="tooltip-back" toggle={() => { this.toggle("back") }}>Back to employee list</Tooltip>
                        &nbsp;
                         <button type="button" className="btn btn-primary btn-sm" id="tooltip-edit">
                            <Link to={"/module/employees/" + this.state.employee._id + "/edit"} className="breadcrumb-link"><i className="fas fa-edit"></i></Link>
                        </button>
                        <Tooltip placement="bottom" isOpen={this.state.editTooltipOpen} target="tooltip-edit" toggle={() => { this.toggle("edit") }}>Edit employee</Tooltip>
                        &nbsp;
                        <button type="button" className="btn btn-success btn-sm" id="tooltip-add">
                            <Link to={"/module/employees/add"} className="breadcrumb-link"><i className="fas fa-plus"></i></Link>
                        </button>
                        <Tooltip placement="bottom" isOpen={this.state.addTooltipOpen} target="tooltip-add" toggle={() => { this.toggle("add") }}>Add new employee</Tooltip>
                        &nbsp;
                        <button type="button" id="tooltip-delete" className="btn btn-danger btn-sm" onClick={() => { this.deleteEmployee() }}><i className="fas fa-trash"></i></button>
                        <Tooltip placement="bottom" isOpen={this.state.deleteTooltipOpen} target="tooltip-delete" toggle={() => { this.toggle("delete") }}>Delete employee</Tooltip>
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
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#address-employee-history" role="tab" aria-controls="address-employee-history" aria-selected="false">Address Details</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#academic" role="tab" aria-controls="academic" aria-selected="false">Academic Details & Employee history</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="document-tab" data-toggle="tab" href="#document-details" role="tab" aria-controls="document-details" aria-selected="false">Document Details</a>
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
                                            <label>First Name : &nbsp;</label>
                                            <span>{this.state.employee.firstName}</span>
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Middle Name : &nbsp;</label>
                                            <span>{this.state.employee.middleName}</span>
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Last Name : &nbsp;</label>
                                            <span>{this.state.employee.lastName}</span>
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Gender : &nbsp;</label>
                                            <span>{this.state.employee.gender}</span>
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Date of birth : &nbsp;</label>
                                            <span>{this.formatDate(this.state.employee.dob)}</span>
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Email : &nbsp;</label>
                                            <span>{this.state.employee.email}</span>
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Mobile No : &nbsp;</label>
                                            <span>{this.state.employee.mobileNo}</span>
                                        </div>

                                        <div className="col-md-4 pb-3">
                                            <label>Status : &nbsp;</label>
                                            <span>{this.state.employee.status}</span>
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Joining Date : &nbsp;</label>
                                            <span>{this.formatDate(this.state.employee.joiningDate)}</span>
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Employee Type : &nbsp;</label>
                                            <span>{this.state.employee.employeeType}</span>
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Designation : &nbsp;</label>
                                            <span>{this.state.employee.designation}</span>
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Pan No. : &nbsp;</label>
                                            <span>{this.state.employee.panCard}</span>
                                        </div>
                                        <div className="col-md-4 pb-3">
                                            <label>Aadhaar No. : &nbsp;</label>
                                            <span>{this.state.employee.aadharCard}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="tab-pane fade" id="address-employee-history" role="tabpanel" aria-labelledby="address-employee-history-tab">
                                    <div className="row pb-3">
                                        <div className="col-md-12 pb-1">
                                            <span className="lead">Correspondense Address</span>
                                            <hr />
                                        </div>
                                        {
                                            this.state.employee.correspondentAddress && (
                                                <Fragment>
                                                    <div className="col-md-12 pb-3">
                                                        <label>Address Line : &nbsp;</label>
                                                        <span>{this.state.employee.correspondentAddress.addressLine}</span>
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>Country : &nbsp;</label>
                                                        <span>{this.state.employee.correspondentAddress.country}</span>
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>State : &nbsp;</label>
                                                        <span>{this.state.employee.correspondentAddress.state}</span>
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>District : &nbsp;</label>
                                                        <span>{this.state.employee.correspondentAddress.district}</span>
                                                    </div>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            this.state.employee.sameAscorrAddress === false && (
                                                <Fragment>
                                                    <div className="col-md-12 pb-1">
                                                        <span className="lead">Permanent Address</span>
                                                        <hr />
                                                    </div>
                                                    <div className="col-md-12 pb-3">
                                                        <label>Address Line : &nbsp;</label>
                                                        <span>{this.state.employee.permanentAddress.addressLine}</span>
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>Country : &nbsp;</label>
                                                        <span>{this.state.employee.permanentAddress.country}</span>
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>State : &nbsp;</label>
                                                        <span>{this.state.employee.permanentAddress.state}</span>
                                                    </div>
                                                    <div className="col-md-4 pb-3">
                                                        <label>District : &nbsp;</label>
                                                        <span>{this.state.employee.permanentAddress.district}</span>
                                                    </div>
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                </div>


                                <div className="tab-pane fade" id="academic" role="tabpanel" aria-labelledby="academic-tab">
                                    <div className="row">
                                        {/* ================================== */}
                                        {
                                            this.state.employee.fresherOrExperienced === "Experienced" && (
                                                <Fragment>
                                                    <div className="col-md-12 pb-1">
                                                        <div className="row">
                                                            <div className="col-md-8 p-0">
                                                                <span className="lead">List of Employment History</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <table className="table">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Employer Name</th>
                                                                    <th>Start From</th>
                                                                    <th>End To</th>
                                                                    <th>Designation</th>
                                                                    <th>Address</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.employee.employeeHistories && this.state.employee.employeeHistories.map((employeeHistory, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{employeeHistory.employerName}</td>
                                                                                <td>{employeeHistory.startFrom}</td>
                                                                                <td>{employeeHistory.endTo}</td>
                                                                                <td>{employeeHistory.empHistDesignation}</td>
                                                                                <td>{employeeHistory.address}</td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                    <div className="row pb-3">
                                        <div className="col-md-12 pb-1">
                                            <span className="lead">List of Academic History</span>
                                        </div>
                                        <div className="col-md-12">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Board</th>
                                                        <th>School / Institute</th>
                                                        <th>Passout Year</th>
                                                        <th>Score</th>
                                                        <th>Highest Qualification</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    this.state.employee.academicHistories && (
                                                        <tbody>
                                                            {
                                                                this.state.employee.academicHistories.map((acaHistory, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{acaHistory.name}</td>
                                                                            <td>{acaHistory.board}</td>
                                                                            <td>{acaHistory.schoolInstitue}</td>
                                                                            <td>{acaHistory.passOutYear}</td>
                                                                            <td>{acaHistory.score}</td>
                                                                            <td>{acaHistory.highestQualification ? 'Yes' : 'No'}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    )
                                                }
                                            </table>
                                        </div>

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="document-details" role="tabpanel" aria-labelledby="document-details-tab">
                                    <div className="row pb-3">
                                        <div className="col-md-12 pb-1">
                                            <span className="lead">Document Details</span>
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="card border-secondary mb-3">
                                        <div className="card-header">Photo</div>
                                        <div className="card-body text-secondary">
                                            <div className="row pb-4">
                                                <div className="col-md-6  pl-0">
                                                    {
                                                        this.state.openPhotoUpload ? (

                                                            <div className="row">
                                                                <div className="col-md-3"><img src={this.state.avatar} alt="profile_photo" className="img-thumbnail" width="90" /></div>
                                                                <div className="col-md-9">
                                                                    <button type="button" className="btn btn-warning btn-sm" id="tooltip-back" onClick={() => {
                                                                        this.setState({ openPhotoUpload: false })
                                                                    }}>
                                                                        <span>Change</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (<span>Upload a photo</span>)
                                                    }
                                                </div>

                                                <div className="col-md-6  pl-0">
                                                    {
                                                        !this.state.openPhotoUpload && (
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <FileUpload afterUpload={this.refresh} fileFor="employee" type="photo" documentName="Photo" employeeId={this.state.employee._id} />
                                                                </div>

                                                                {this.state.employee.photoDocId && (
                                                                    <div className="col-md-4">
                                                                        <button type="button" className="btn btn-danger btn-sm" id="tooltip-back" onClick={() => {
                                                                            this.setState({ openPhotoUpload: true })
                                                                        }}>
                                                                            <span>Cancel</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card border-secondary mb-3">
                                        <div className="card-header">Aadhaar</div>
                                        <div className="card-body text-secondary">
                                            <div className="row pb-4">
                                                <div className="col-md-6  pl-0">
                                                    {
                                                        this.state.openAadhaarUpload ? (
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <a href={getDocUrl(this.state.employee.aadhaarDocId)} style={{ "textDecoration": "underline" }}>Download</a>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <button type="button" className="btn btn-warning btn-sm" id="tooltip-back" onClick={() => {
                                                                        this.setState({ openAadhaarUpload: false })
                                                                    }}>
                                                                        <span>Change</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (<span><i className="fas fa-info-circle"></i> Upload Aadhaar</span>)
                                                    }
                                                </div>
                                                <div className="col-md-6">
                                                    {
                                                        !this.state.openAadhaarUpload && (
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <FileUpload afterUpload={this.refresh} fileFor="employee" type="aadhaar" documentName="Aadhaar" employeeId={this.state.employee._id} />
                                                                </div>
                                                                {this.state.employee.aadhaarDocId && (
                                                                    <div className="col-md-4">
                                                                        <button type="button" className="btn btn-danger btn-sm" id="tooltip-back" onClick={() => {
                                                                            this.setState({ openAadhaarUpload: true })
                                                                        }}>
                                                                            <span>Cancel</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="card border-secondary mb-3">
                                        <div className="card-header">PAN</div>
                                        <div className="card-body text-secondary">
                                            <div className="row pb-4">
                                                <div className="col-md-6 pl-0">
                                                    {
                                                        this.state.openPanUpload ? (
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <a href={getDocUrl(this.state.employee.panDocId)} style={{ "textDecoration": "underline" }}>Download</a>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <button type="button" className="btn btn-warning btn-sm" id="tooltip-back" onClick={() => {
                                                                        this.setState({ openPanUpload: false })
                                                                    }}>
                                                                        <span>Change</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (<span><i className="fas fa-info-circle"></i> Upload PAN</span>)
                                                    }
                                                </div>
                                                <div className="col-md-6">
                                                    {
                                                        !this.state.openPanUpload && (
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <FileUpload afterUpload={this.refresh} fileFor="employee" type="pan" documentName="Pan" employeeId={this.state.employee._id} />
                                                                </div>
                                                                {this.state.employee.panDocId && (
                                                                    <div className="col-md-4">
                                                                        <button type="button" className="btn btn-danger btn-sm" id="tooltip-back" onClick={() => {
                                                                            this.setState({ openPanUpload: true })
                                                                        }}>
                                                                            <span>Cancel</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card border-secondary mb-3">
                                        <div className="card-header">10 Certificate</div>
                                        <div className="card-body text-secondary">
                                            <div className="row  pb-4">
                                                <div className="col-md-6 pl-0">
                                                    {
                                                        this.state.openXUpload ? (
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <a href={getDocUrl(this.state.employee.XDocId)} style={{ "textDecoration": "underline" }}>Download</a>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <button type="button" className="btn btn-warning btn-sm" id="tooltip-back" onClick={() => {
                                                                        this.setState({ openXUpload: false })
                                                                    }}>
                                                                        <span>Change</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (<span><i className="fas fa-info-circle"></i> Upload 10 certificate</span>)
                                                    }
                                                </div>
                                                <div className="col-md-6">
                                                    {
                                                        !this.state.openXUpload && (
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <FileUpload afterUpload={this.refresh} fileFor="employee" type="10_CERTIFICATE" documentName="10 certificate" employeeId={this.state.employee._id} />
                                                                </div>
                                                                {this.state.employee.XDocId && (
                                                                    <div className="col-md-4">
                                                                        <button type="button" className="btn btn-danger btn-sm" id="tooltip-back" onClick={() => {
                                                                            this.setState({ openXUpload: true })
                                                                        }}>
                                                                            <span>Cancel</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card border-secondary mb-3">
                                        <div className="card-header">10+2 Certificate</div>
                                        <div className="card-body text-secondary">
                                            <div className="row  pb-4">
                                                <div className="col-md-6 pl-0">
                                                    {
                                                        this.state.openXIIUpload ? (
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <a href={getDocUrl(this.state.employee.XIIDocId)} style={{ "textDecoration": "underline" }}>Download</a>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <button type="button" className="btn btn-warning btn-sm" id="tooltip-back" onClick={() => {
                                                                        this.setState({ openXIIUpload: false })
                                                                    }}>
                                                                        <span>Change</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (<span><i className="fas fa-info-circle"></i> Upload 10+2 certificate</span>)
                                                    }
                                                </div>
                                                <div className="col-md-6">
                                                    {
                                                        !this.state.openXIIUpload && (
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <FileUpload afterUpload={this.refresh} fileFor="employee" type="10+2_CERTIFICATE" documentName="10+2 certificate" employeeId={this.state.employee._id} />
                                                                </div>
                                                                {this.state.employee.XIIDocId && (
                                                                    <div className="col-md-4">
                                                                        <button type="button" className="btn btn-danger btn-sm" id="tooltip-back" onClick={() => {
                                                                            this.setState({ openXIIUpload: true })
                                                                        }}>
                                                                            <span>Cancel</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card border-secondary mb-3">
                                        <div className="card-header">Graduate certificate</div>
                                        <div className="card-body text-secondary">
                                            <div className="row  pb-4">
                                                <div className="col-md-6 pl-0">
                                                    {
                                                        this.state.openGraduateUpload ? (
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <a href={getDocUrl(this.state.employee.graduationDocId)} style={{ "textDecoration": "underline" }}>Download</a>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <button type="button" className="btn btn-warning btn-sm" id="tooltip-back" onClick={() => {
                                                                        this.setState({ openGraduateUpload: false })
                                                                    }}>
                                                                        <span>Change</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (<span><i className="fas fa-info-circle"></i>Upload Graduate certificate</span>)
                                                    }
                                                </div>
                                                <div className="col-md-6">
                                                    {
                                                        !this.state.openGraduateUpload && (
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <FileUpload afterUpload={this.refresh} fileFor="employee" type="GRADUATE_CERTIFICATE" documentName="Graduate certificate" employeeId={this.state.employee._id} />
                                                                </div>
                                                                {this.state.employee.graduationDocId && (
                                                                    <div className="col-md-4">
                                                                        <button type="button" className="btn btn-danger btn-sm" id="tooltip-back" onClick={() => {
                                                                            this.setState({ openGraduateUpload: true })
                                                                        }}>
                                                                            <span>Cancel</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card border-secondary mb-3">
                                        <div className="card-header">Post graduate certificate</div>
                                        <div className="card-body text-secondary">
                                            <div className="row  pb-4">
                                                <div className="col-md-6 pl-0">
                                                    {
                                                        this.state.openPostGraduateUpload ? (
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <a href={getDocUrl(this.state.employee.postGraduationDocId)} style={{ "textDecoration": "underline" }}>Download</a>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <button type="button" className="btn btn-warning btn-sm" id="tooltip-back" onClick={() => {
                                                                        this.setState({ openPostGraduateUpload: false })
                                                                    }}>
                                                                        <span>Change</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (<span><i className="fas fa-info-circle"></i> Upload Post graduate certificate</span>)
                                                    }
                                                </div>
                                                <div className="col-md-6">
                                                    {
                                                        !this.state.openPostGraduateUpload && (
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <FileUpload afterUpload={this.refresh} fileFor="employee" type="POST_GRADUATE_CERTIFICATE" documentName="Post graduate certificate" employeeId={this.state.employee._id} />
                                                                </div>
                                                                {this.state.employee.postGraduationDocId && (
                                                                    <div className="col-md-4">
                                                                        <button type="button" className="btn btn-danger btn-sm" id="tooltip-back" onClick={() => {
                                                                            this.setState({ openPostGraduateUpload: true })
                                                                        }}>
                                                                            <span>Cancel</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>
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

export default EmployeeView;
import { IUser } from "./security";

export interface IEmployeeAttendence {
    id: Number
    attDate: String
    employees: IEmployee[]

}

export interface IEmployeeHistory {
    id: Number
    employerName: String
    address: String
    startDate: String
    endDate: String
    designation: String
}

export interface IAddress {
    id: Number
    firstLine: String
    secondLine: String
    country: String
    state: String
    district: String
}

export interface IPersonalInfo {
    id: Number
    panCard: String
    panCardDoc?: Document
    aadharCard: String
    aadharCardDoc?: Document
    voterId: String
    voterIdDoc?: Document
    drivingLicence: String
    drivingLicenceDoc?: Document

    xCertDoc?: Document
    xIICertDoc?: Document
    graduationCertDoc?: Document
    postGraduationCertDoc?: Document
}

export interface Document {
    id: Number
    docUrl: String
}

export interface IAcademicBackground {
    id: Number
    name: String
    board: String
    schoolInstitue: String
    startYear: String
    passOutYear: String
    score: String
    highestQualification: Boolean
}

export interface IDocument {
    id: String
    name: String
    type: String
    documentName: String
}

export interface IRecordAudit {
    createdBy: IUser
    updatedBy: IUser
    createdDate: String
    updatedDate: String
}

export interface IEmployeeSalary {
    id: Number
    salaryAmount: Number
    employee: IEmployee
}

export interface IEmployee {

    id: Number
    firstName: String
    middleName: String
    lastName: String
    email: String
    mobileNo: String
    status: String
    dob: String,
    joiningDate: String
    employeeType: String
    designation: String
    profilePic?: Document

    personalInfo: IPersonalInfo
    correspondentAddress: IAddress
    permanentAddress: IAddress

    lastEmployeeHistory: IEmployeeHistory
    highestQualification: IAcademicBackground
    recordAudit?: IRecordAudit
}

export class EmployeeStatus {

    public static IN_ACTIVE: String = "In active"
    public static ACTIVE: String = "Active"
    public static EXPIRED: String = "Expired"
}

export class EmployeeType {

    public static TEACHING_STAFF: String = "Teaching staff"
    public static CLERK: String = "Clerk"
    public static FINANCE: String = "Finance"
}

export interface IPaySalary {
    id: Number
    payDate: String
    paidAmount: Number
    dueAmount: Number
    employeeSalary: IEmployeeSalary
}


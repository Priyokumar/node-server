import { IStudent } from "./student.model";

export interface IAdmission {
    id: Number
    admissionRefNo: String
    academicYear: String
    admissionDate: String
    standard: String
    status: String
    admissionAmount: Number
    paidAmount: Number
    dueAmount: Number
    promiseToPayDate: String
    student: IStudent
    fees: IFee[]
}

export interface IFee {
    id: Number
    feeRefNo: String
    status: String
    amount: String
    exptdateOfPayment: String
    actdateOfPayment: String
    monthOf: Number
}

export const AdmissionStatuses: IKeyValue[] = [

    { key: "PAID", value: "Paid" },
    { key: "DUE", value: "Due" },
    { key: "EXPIRED", value: "Expired" }

];


export interface IKeyValue {
    key: String;
    value: any
}
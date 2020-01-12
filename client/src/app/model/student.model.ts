import { IAddress } from "./employeeModels";

export interface IStudent {

    id: Number
    registrationNo: String
    registrationDate: String
    registrationStatus: String
    firstName: String
    middleName: String
    lastName: String
    standard: String
    rollNo: String
    dob: String
    joiningDate: String
    correspondentAddress: IAddress
    fatherInfo: IGuardian
    motherInfo: IGuardian
    guardianInfo: IGuardian
}

export interface IGuardian {

    id: Number
    name: String
    dob: String
    relationship: String
    contactNo: String
}

export const Standards: IKeyValue[] = [

    { key: "NUSSERY", value: "Nussery" },
    { key: "KG", value: "KG" },
    { key: "CLASS_I", value: "Class I" },
    { key: "CLASS_II", value: "Class II" },
    { key: "CLASS_III", value: "Class III" },
    { key: "CLASS_IV", value: "Class IV" },
    { key: "CLASS_V", value: "Class V" },
    { key: "CLASS_VI", value: "Class VI" },
    { key: "CLASS_VII", value: "Class VII" },
    { key: "CLASS_VIII", value: "Class VIII" },
    { key: "CLASS_IX", value: "Class IX" },
    { key: "CLASS_X", value: "Class X" }

];

export const RegistrationStatus: IKeyValue[] = [

    { key: "SUBMITTED", value: "Submitted" },
    { key: "ADMISSION_PENDIND", value: "Admission Pending" },
    { key: "REGISTERED", value: "Registered" },
    { key: "EXPIRED", value: "Expired" }

]

export const Genders: IKeyValue[] = [
    { key: "MALE", value: "Male" },
    { key: "FEMALE", value: "Female" }
];


export interface IKeyValue {
    key: String;
    value: any
}
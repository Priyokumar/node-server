import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Standards, RegistrationStatus, IStudent } from "src/app/model/student.model";

import { IKeyValue } from "src/app/model/IKeyVal";
import { IAdmission, AdmissionStatuses, IFee } from "src/app/model/admission-fee.model";
import { MatTableDataSource } from "@angular/material";
import { IAdmissionFeeMaintenance } from "src/app/model/maintenance";

export class Admission {

    admId: number
    errorMessage: String
    hasSubmitted: boolean = false
    admissionForm: FormGroup
    admission: IAdmission
    admissionStatuses: IKeyValue[] = AdmissionStatuses
    registrationStatuses: IKeyValue[] = RegistrationStatus
    standards: IKeyValue[] = Standards
    fees: IFee[];
    student: IStudent
    admissionFeeMaintenance: IAdmissionFeeMaintenance;

    public feeColumns: string[] = [

        "id",
        "feeRef",
        "amount",
        "exptdateOfPayment",
        "actdateOfPayment",
        "monthOf",
        "status",
    ];

    public feesDataSource: MatTableDataSource<IFee>;
    public fee: IFee[] = [];

    idFormCtl = new FormControl('', null)
    admissionRefNoFormCtl = new FormControl('', null)
    academicYearFormCtl = new FormControl('', null)
    admissionDateFormCtl = new FormControl('', null)
    standardFormCtl = new FormControl('', null)
    statusFormCtl = new FormControl('', null)
    admissionAmountFormCtl = new FormControl('', Validators.required)
    paidAmountFormCtl = new FormControl('', Validators.required)
    dueAmountFormCtl = new FormControl('', null);
    promiseToPayDateFormCtl = new FormControl('', null)

    studIdFormCtl = new FormControl('', null)
    firstNameFormCtl = new FormControl('', null)
    lastNameFormCtl = new FormControl('', null)
    rollNoFormCtl = new FormControl('', null)

    regIdIdFormCtl = new FormControl('', null)
    registrationNoFormCtl = new FormControl('', null);
    registrationDateFormCtl = new FormControl('', null);
    registrationStatusFormCtl = new FormControl('', null);


    constructor() {
        this.admissionForm = new FormGroup({
            admissionRefNoFormCtl: this.admissionRefNoFormCtl,
            academicYearFormCtl: this.academicYearFormCtl,
            admissionDateFormCtl: this.admissionDateFormCtl,
            standardFormCtl: this.standardFormCtl,
            statusFormCtl: this.statusFormCtl,
            admissionAmountFormCtl: this.admissionAmountFormCtl,
            paidAmountFormCtl: this.paidAmountFormCtl,
            dueAmountFormCtl: this.dueAmountFormCtl,
            promiseToPayDateFormCtl: this.promiseToPayDateFormCtl,

            firstNameFormCtl: this.firstNameFormCtl,
            lastNameFormCtl: this.lastNameFormCtl,

        })

        this.academicYearFormCtl.setValue(new Date().getFullYear())
        this.academicYearFormCtl.disable()
        this.admissionRefNoFormCtl.disable()
        this.admissionDateFormCtl.disable()
        this.statusFormCtl.disable()
        this.firstNameFormCtl.disable()
        this.lastNameFormCtl.disable()
        this.rollNoFormCtl.disable()
        this.registrationNoFormCtl.disable()
        this.registrationDateFormCtl.disable()
        this.registrationStatusFormCtl.disable()
        this.dueAmountFormCtl.disable()
        this.promiseToPayDateFormCtl.disable()
    }
}
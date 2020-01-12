import { FormGroup, FormControl, Validators } from "@angular/forms"
import * as moment from "moment"
import { IStudent, RegistrationStatus, Standards, Genders } from 'src/app/model/student.model';
import { IKeyValue } from 'src/app/model/IKeyVal';

export class Student {

    studId: number
    errorMessage: String
    hasSubmitted: boolean = false
    studentForm: FormGroup
    student: IStudent
    registrationStatuses: IKeyValue[] = RegistrationStatus
    standards: IKeyValue[] = Standards
    genders: IKeyValue[] = Genders
    yesNo: IKeyValue[] = [{ key: "Yes", value: true }, { key: "No", value: false }]

    // Registration details
    idFormCtl = new FormControl('', null)
    registrationNoFormCtl = new FormControl('', null)
    registrationDateFormCtl = new FormControl('', null)
    registrationStatusFormCtl = new FormControl('', null)

    // Student basic details
    firstNameFormCtl = new FormControl('', Validators.required)
    middleNameFormCtl = new FormControl('', null)
    lastNameFormCtl = new FormControl('', Validators.required)
    standardFormCtl = new FormControl('', Validators.required)
    rollNoFormCtl = new FormControl('', null)
    dobFormCtl = new FormControl('', Validators.required)
    joiningDateFormCtl = new FormControl('', null)
    genderFormCtl = new FormControl('', null)
    bloodGroupFormCtl = new FormControl('', null)
    religionFormCtl = new FormControl('', null)
    casteFormCtl = new FormControl('', null)
    nationalityFormCtl = new FormControl('', null)
    communityFormCtl = new FormControl('', null)

    // Permanent Address details
    sameAsPermAddrFormCtl = new FormControl('', null)
    addIdFormCtl = new FormControl('', null)
    firstLineFormCtl = new FormControl('', Validators.required)
    secondLineFormCtl = new FormControl('', null)
    countryFormCtl = new FormControl('', Validators.required)
    stateFormCtl = new FormControl('', Validators.required)
    districtFormCtl = new FormControl('', Validators.required)

    // Correspondent Address
    corrAddIdFormCtl = new FormControl('', null)
    corrFirstLineFormCtl = new FormControl('', Validators.required)
    corrSecondLineFormCtl = new FormControl('', null)
    corrCountryFormCtl = new FormControl('', Validators.required)
    corrStateFormCtl = new FormControl('', Validators.required)
    corrDistrictFormCtl = new FormControl('', Validators.required)

    // Student Father details
    fInfoIdFormCtl = new FormControl('', null)
    fatherNameFormCtl = new FormControl('', Validators.required)
    fatherDobFormCtl = new FormControl('', Validators.required)
    fatherContactNoFormCtl = new FormControl('', Validators.required)
    fatherEduQualiFormCtl = new FormControl('', Validators.required)
    fatherOccupationFormCtl = new FormControl('', Validators.required)
    fatherAnnualIncomeFormCtl = new FormControl('', Validators.required)
    fatherAadhaarNoFormCtl = new FormControl('', Validators.required)

    // Student Mother details
    mInfoIdFormCtl = new FormControl('', null)
    motherNameFormCtl = new FormControl('', Validators.required)
    motherDobFormCtl = new FormControl('', Validators.required)
    motherContactNoFormCtl = new FormControl('', Validators.required)
    motherEduQualiFormCtl = new FormControl('', Validators.required)
    motherOccupationFormCtl = new FormControl('', Validators.required)
    motherAnnualIncomeFormCtl = new FormControl('', Validators.required)
    motherAadhaarNoFormCtl = new FormControl('', Validators.required)

    // Student Guardian details
    gInfoIdFormCtl = new FormControl('', null)
    guardianNameFormCtl = new FormControl('', null)
    guardianDobFormCtl = new FormControl('', null)
    guardianContactNoFormCtl = new FormControl('', null)
    guardianEduQualiFormCtl = new FormControl('', Validators.required)
    gaurdianOccupationFormCtl = new FormControl('', Validators.required)
    guardianAnnualIncomeFormCtl = new FormControl('', Validators.required)
    gaurdianAadhaarNoFormCtl = new FormControl('', Validators.required)

    constructor() {
        this.studentForm = new FormGroup({

            // Student basic details
            firstNameFormCtl: this.firstNameFormCtl,
            middleNameFormCtl: this.middleNameFormCtl,
            lastNameFormCtl: this.lastNameFormCtl,
            standardFormCtl: this.standardFormCtl,
            rollNoFormCtl: this.rollNoFormCtl,
            dobFormCtl: this.dobFormCtl,
            joiningDateFormCtl: this.joiningDateFormCtl,

            // Student Address details
            firstLineFormCtl: this.firstLineFormCtl,
            secondLineFormCtl: this.secondLineFormCtl,
            countryFormCtl: this.countryFormCtl,
            stateFormCtl: this.stateFormCtl,
            districtFormCtl: this.districtFormCtl,

            // Student Father details
            fatherNameFormCtl: this.fatherNameFormCtl,
            fatherDobFormCtl: this.fatherDobFormCtl,
            fatherContactNoFormCtl: this.fatherContactNoFormCtl,

            // Student Mother details
            motherNameFormCtl: this.motherNameFormCtl,
            motherDobFormCtl: this.motherDobFormCtl,
            motherContactNoFormCtl: this.motherContactNoFormCtl,

            // Student Guardian details
            guardianNameFormCtl: this.guardianNameFormCtl,
            guardianDobFormCtl: this.guardianDobFormCtl,
            guardianContactNoFormCtl: this.guardianContactNoFormCtl
        })

        this.registrationNoFormCtl.disable()
        this.registrationDateFormCtl.disable()
        this.registrationDateFormCtl.setValue(moment())
        this.registrationStatusFormCtl.disable()
    }
}
import { ax } from "../api/axios"

export const getEmployees = async () => {
    let response = await ax.get("/employees", { withCredentials: true })
    return response.data
}

export const saveEmployee = async (employee) => {
    let response = await ax.post("/employees", employee, { withCredentials: true })
    return response.data
}

export const updateEmployee = async (id, employee) => {
    let response = await ax.put("/employees/" + id, employee, { withCredentials: true })
    return response.data
}

export const getEmployee = async (id) => {
    let response = await ax.get("/employees/" + id, { withCredentials: true })
    return response.data
}

export const deleteEmployee = async (id) => {
    let response = await ax.delete("/employees/" + id, { withCredentials: true })
    return response.data
}

export const setInitialState = (ref) => {
    ref.state = {
        id: "",
        employee: null,

        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        email: "",
        mobileNo: "",
        status: "",
        dob: "",
        joiningDate: "",
        employeeType: "",
        designation: "",
        panCard: "",
        aadharCard: "",
        voterId: "",
        drivingLicence: "",

        /* Correspondense Address */
        corrAddressLine: "",
        corrCountry: "India",
        corrState: "Manipur",
        corrDistrict: "Thoubal",

        sameAscorrAddress: false,

        /* Permanent Address */
        permAddressLine: "",
        permCountry: "India",
        permState: "Manipur",
        permDistrict: "Thoubal",

        fresherOrExperienced: "Fresher",
        employeeHistories: [],

        acaName: "",
        board: "",
        schoolInstitue: "",
        passOutYear: "",
        score: "",
        highestQualification: false,
        academicHistories: [],

        isLoading: false,
        errorMessage: ""
    }
}

export const getEditData = async (ref) => {

    let id = ref.props.match.params.id
    if (id) {
        try {
            let employee = await getEmployee(id)
            ref.setState({
                id: id,
                firstName: employee.firstName,
                middleName: employee.middleName,
                lastName: employee.lastName,
                gender: employee.gender,
                email: employee.email,
                mobileNo: employee.mobileNo,
                status: employee.status,
                dob: employee.dob,
                joiningDate: employee.joiningDate,
                employeeType: employee.employeeType,
                designation: employee.designation,
                panCard: employee.panCard,
                aadharCard: employee.aadharCard,

                sameAscorrAddress: employee.sameAscorrAddress,
                corrAddressLine: employee.correspondentAddress ? employee.correspondentAddress.addressLine : "",
                corrCountry: employee.correspondentAddress ? employee.correspondentAddress.state ? employee.correspondentAddress.state : "India" : "India",
                corrState: employee.correspondentAddress ? employee.correspondentAddress.state ? employee.correspondentAddress.state : "Manipur" : "Manipur",
                corrDistrict: employee.correspondentAddress ? employee.correspondentAddress.district ? employee.correspondentAddress.district : "Thoubal" : "Thoubal",

                permAddressLine: employee.permanentAddress ? employee.permanentAddress.addressLine : "",
                permCountry: employee.permanentAddress ? employee.permanentAddress.country ? employee.permanentAddress.country : "India" : "India",
                permState: employee.permanentAddress ? employee.permanentAddress.state ? employee.permanentAddress.state : "Manipur" : "Manipur",
                permDistrict: employee.permanentAddress ? employee.permanentAddress.district ? employee.permanentAddress.district : "Thoubal" : "Thoubal",

                fresherOrExperienced: employee.fresherOrExperienced || "Fresher",
                employeeHistories: employee.employeeHistories,

                academicHistories: employee.academicHistories ? employee.academicHistories : []
            })

        } catch (error) {
            console.log(error)
        }

    }
}

export const addAcademicHistory = (ref) => {

    if (!ref.state.acaName || !ref.state.board || !ref.state.schoolInstitue || !ref.state.passOutYear || !ref.state.score)
        return;

    let academicHistory = {
        name: ref.state.acaName,
        board: ref.state.board,
        schoolInstitue: ref.state.schoolInstitue,
        passOutYear: ref.state.passOutYear,
        score: ref.state.score,
        highestQualification: ref.state.highestQualification
    }
    ref.state.academicHistories.push(academicHistory)
    ref.setState({
        acaName: "",
        board: "",
        schoolInstitue: "",
        passOutYear: "",
        score: "",
        highestQualification: false
    })
}

export const addDocument = (ref) => {

    if (!ref.state.docName)
        return;
    ref.state.docs.push(ref.state.docName)
    ref.setState({
        docName: ""
    })
}

export const saveOrUpdateEmployee = async (ref) => {

    let reqBody = {

        firstName: ref.state.firstName,
        middleName: ref.state.middleName,
        lastName: ref.state.lastName,
        gender: ref.state.gender,
        email: ref.state.email,
        mobileNo: ref.state.mobileNo,
        status: ref.state.status,
        dob: ref.state.dob,
        joiningDate: ref.state.joiningDate,
        employeeType: ref.state.employeeType,
        designation: ref.state.designation,
        panCard: ref.state.panCard,
        aadharCard: ref.state.aadharCard,
        voterId: ref.state.voterId,
        drivingLicence: ref.state.drivingLicence,
        sameAscorrAddress: ref.state.sameAscorrAddress,

        correspondentAddress: {
            addressLine: ref.state.corrAddressLine,
            country: ref.state.corrCountry,
            state: ref.state.corrState,
            district: ref.state.corrDistrict
        },

        fresherOrExperienced: ref.state.fresherOrExperienced,
        employeeHistories: ref.state.employeeHistories,

        academicHistories: ref.state.academicHistories
    }

    if (!ref.state.sameAscorrAddress) {
        reqBody.permanentAddress = {
            addressLine: ref.state.permAddressLine,
            country: ref.state.permCountry,
            state: ref.state.permState,
            district: ref.state.permDistrict
        }
    }
    else {
        if (reqBody.permanentAddress)
            reqBody.permanentAddress = null
    }

    try {
        ref.setState({ isLoading: true })
        let id = ref.props.match.params.id
        let savedEmployee

        if (id)
            savedEmployee = await updateEmployee(id, reqBody)
        else
            savedEmployee = await saveEmployee(reqBody)

        ref.props.history.push("/module/employees/" + savedEmployee._id + "/view")

        ref.setState({ isLoading: false })
    } catch (error) {
        ref.setState({ isLoading: false })
    }
}

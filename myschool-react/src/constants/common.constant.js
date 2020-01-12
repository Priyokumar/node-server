
export const GENDERS = [
    { id: "Male", name: "Male" },
    { id: "Female", name: "Female" }
]

export const DOCUMENT_NAMES = [
    { id: "Aadhaar", name: "Aadhaar" },
    { id: "PAN", name: "PAN" },
    { id: "Driving License", name: "Driving License" },
    { id: "10 Certificate", name: "10 Certificate" },
    { id: "10+2 Certificate", name: "10+2 Certificate" },
    { id: "Graduate", name: "Graduate" },
    { id: "Post Graduate", name: "Post Graduate" }
]

export const ACADEMIC_NAMES = [
    { id: "10", name: "10" },
    { id: "10+2", name: "10+2" },
    { id: "Graduate", name: "Graduate" },
    { id: "Post Graduate", name: "Post Graduate" }
]

export const DISTRICTS = [

    { id: "Bishnupur", name: "Bishnupur" },
    { id: "Chandel", name: "Chandel" },
    { id: "Churachandpur", name: "Churachandpur" },
    { id: "Imphal-East", name: "Imphal-East" },
    { id: "Imphal-West", name: "Imphal-West" },
    { id: "Senapati", name: "Senapati" },
    { id: "Tamenglong", name: "Tamenglong" },
    { id: "Thoubal", name: "Thoubal" },
    { id: "Ukhrul", name: "Ukhrul" },
    { id: "Kangpokpi", name: "Kangpokpi" },
    { id: "Tengnoupal", name: "Tengnoupal" },
    { id: "Pherzawl", name: "Pherzawl" },
    { id: "Noney", name: "Noney" },
    { id: "Kamjong", name: "Kamjong" },
    { id: "Jiribam", name: "Jiribam" },
    { id: "Kakching", name: "Kakching" }
]

export const YEARS = (startYear, endYear) => {

    let diff = endYear - startYear
    let years = []

    for (let i = 0; i < diff; i++)
        years.push(startYear + i)

    return years

}
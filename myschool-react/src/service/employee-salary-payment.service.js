import { ax } from "../api/axios"

export const getEmployeeSalaryPayments = async () => {
    let response = await ax.get("/employee-salary-payments", { withCredentials: true })
    return response.data
}

export const saveEmployeeSalaryPayment = async (employeeSalaryPayment) => {
    let response = await ax.post("/employee-salary-payments", employeeSalaryPayment, { withCredentials: true })
    return response.data
}

export const updateEmployeeSalaryPayment = async (id, employeeSalaryPayment) => {
    let response = await ax.put("/employee-salary-payments/" + id, employeeSalaryPayment, { withCredentials: true })
    return response.data
}

export const getEmployeeSalaryPayment = async (id) => {
    let response = await ax.get("/employee-salary-payments/" + id, { withCredentials: true })
    return response.data
}

export const deleteEmployeeSalaryPayment = async (id) => {
    let response = await ax.delete("/employee-salary-payments/" + id, { withCredentials: true })
    return response.data
}

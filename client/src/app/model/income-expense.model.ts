import { IKeyValue } from "./student.model";

export interface IExpense {

    id: Number
    refNo: String
    amount: Number
    expenseType: String
    expenseDetails: String
    comments: String
    expenseDate: String
}

export interface IIncome {

    id: Number
    refNo: string
    amount: Number
    incomeType: String
    incomeDetails: String
    comments: String
    incomeDate: String
}

export const ExpenseTypes: IKeyValue[] = [

    { key: "MAINTENANCE", value: "Maintenance" },
    { key: "SALARY", value: "Salary" },
    { key: "CLASS_ROOM_MAINTENANCE", value: "Class room maintenance" },
    { key: "LABORATORY_EQUIPEMENTS", value: "Laboratory Equipments" },
    { key: "LIBRARY", value: "Library" },
    { key: "WATER", value: "Water" },
    { key: "ELECTRICITY_BILL", value: "Electricity bill" },
    { key: "COMPUTER", value: "Computer" },
    { key: "SCHOOL_BUILDING", value: "School building" },
    { key: "GAME_AND_SPORT", value: "Games and sports" },
    { key: "ANNUAL_FUNCTION", value: "Annual function" },
    { key: "TEACHER_DAY_FUNCTION", value: "Teacher's day function" },
    { key: "CHILDREN_DAY_FUNCTION", value: "Children's day function" },
    { key: "OTHERS", value: "Others" }
]

export const IncomeTypes: IKeyValue[] = [

    { key: "ADMISSION", value: "Admission" },
    { key: "FEE", value: "Fee" },
    { key: "OTHERS", value: "Others" }
]
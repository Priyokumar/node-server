
export class ApiEndpoint {

    public static BASE_URL = "http://localhost:8080"

    public static SECURITY = ApiEndpoint.BASE_URL + "/security"
    public static LOGIN = ApiEndpoint.BASE_URL + "/security/login"
    public static EMPLOYEES = ApiEndpoint.BASE_URL + "/employees"
    public static ADMISSIONS = ApiEndpoint.BASE_URL + "/admission-fees"
    public static STUDENTS = ApiEndpoint.BASE_URL + "/students"
    public static ADDMISSION_FEE_MAINTENANCE = ApiEndpoint.BASE_URL + "/maintenance/admission-fees"
    public static EXPENSES = ApiEndpoint.BASE_URL + "/expenses"
    public static INCOMES = ApiEndpoint.BASE_URL + "/incomes"
    public static ROLES = ApiEndpoint.BASE_URL + "/roles"
    public static USERS = ApiEndpoint.BASE_URL + "/users"
    public static EMPLOYEE_SALARY = ApiEndpoint.BASE_URL + "/salaries"
    public static EMPLOYEE_ATTENDENCES = ApiEndpoint.BASE_URL + "/employee-attendences"
    public static PAY_SALARY = ApiEndpoint.BASE_URL + "/pay-salaries"
    public static DOCUMENT = ApiEndpoint.BASE_URL + "/document"


}
import { IKeyValue } from './IKeyVal';


export class UserRole {
    static SUPER_ADMIN: String = "SUPER_ADMIN";
    static ADMIN: String = "ADMIN";
    static CLERK: String = "CLERK";
}

export const userRoles: IKeyValue[] = [

    { key: UserRole.SUPER_ADMIN, value: "Super admin" },
    { key: UserRole.ADMIN, value: "Admin" },
    { key: UserRole.CLERK, value: "Clerk" }
]


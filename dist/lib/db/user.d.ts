import { type RowDataPacket } from 'mysql2/promise';
export declare const UserRole: {
    Admin: string;
    Spv: string;
    SalesSpv: string;
    None: string;
};
export type UserRoleType = typeof UserRole[keyof typeof UserRole];
export declare class DbUser {
    static tableName: string;
    static keyId: string;
    static keyUsrName: string;
    static keyUsrPwd: string;
    static keyUsrToken: string;
    static keyUsrRole: string;
    static keyPersonIdNumber: string;
    static keyPersonName: string;
    static keyPersonPhone: string;
    static keyCreatedAt: string;
    static keyDeletedAt: string;
    static keys(except?: string[]): string[];
    static generateToken(data: IUser): string;
    static createTable(): Promise<void>;
    /**
     *
     * @param fcolumns
     * @param flogics
     * @param fvalues
     * @returns
     */
    static fetchAll(data: FetchRequest): Promise<IUser[]>;
    static insert(data: IUser): Promise<import("mysql2/promise").QueryResult>;
    static update(data: IUser): Promise<import("mysql2/promise").QueryResult>;
}
export interface IUser extends RowDataPacket {
    id?: BigInt;
    usr_name: string;
    usr_pwd: string;
    usr_token?: string;
    usr_role: UserRoleType;
    person_id_number: string;
    person_name: string;
    person_phone: string;
    created_at?: string;
    deleted_at?: string;
}
export interface FetchRequest {
    filterColumns?: Array<string | number | null>;
    filterLogics?: Array<string | number | null>;
    filterValues?: Array<string | number | null>;
}
export default DbUser;
//# sourceMappingURL=user.d.ts.map
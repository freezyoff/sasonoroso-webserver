import { Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
export declare const UserRole: {
    super: string;
    salesSpv: string;
    sales: string;
    none: string;
};
export type UserRoleType = typeof UserRole[keyof typeof UserRole];
export declare class IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
    id: CreationOptional<number>;
    usrName: string;
    usrPwd: string;
    usrToken: string | null;
    usrRole: UserRoleType;
    personIdNumber: string;
    personName: string;
    personPhone: string;
}
//# sourceMappingURL=user.d.ts.map
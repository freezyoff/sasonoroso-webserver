import { Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
export declare class IPartner extends Model<InferAttributes<IPartner>, InferCreationAttributes<IPartner>> {
    id: CreationOptional<number>;
    salesPersonId: number | null;
    storeName: string;
    storeAddr: string;
    storeMapHttp: string | null;
    storeMapLatitude: string | null;
    storeMapLongitude: string | null;
    ownerName: string | null;
    ownerPhone: string | null;
    picName: string;
    picPhone: string;
}
//# sourceMappingURL=partner.d.ts.map
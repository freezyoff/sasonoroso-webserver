import { Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
export declare class IProduct extends Model<InferAttributes<IProduct>, InferCreationAttributes<IProduct>> {
    id: CreationOptional<number>;
    category: string;
    name: string;
    desc: string;
    cogs: number;
    suggestedRetailPrice: number;
}
//# sourceMappingURL=product.d.ts.map
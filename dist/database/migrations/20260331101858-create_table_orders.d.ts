import { type QueryInterface } from "sequelize";
export declare const tableNameConsignment = "consignment";
export declare const tableNameConsignmentDetails = "consignment_details";
export declare const tableNameConsignmentSold = "consignment_sold";
export declare const tableNameConsignmentPayments = "consignment_payed";
/** @type {import('sequelize-cli').Migration} */
declare const _default: {
    up(queryInterface: QueryInterface): Promise<void>;
    down(queryInterface: QueryInterface): Promise<void>;
};
export default _default;
//# sourceMappingURL=20260331101858-create_table_orders.d.ts.map
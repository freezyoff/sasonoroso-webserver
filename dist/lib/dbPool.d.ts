import mysql, { type QueryResult } from 'mysql2/promise';
declare class Pool {
    static _pool: mysql.Pool | null;
    static get(): mysql.Pool;
    static close(): Promise<void>;
    /**
     * SELECT query
     * @param {Array<(string | null | Number)>} table target tables
     * @param {Array<(string | null | Number)>} fcolumns filter columns
     * @param {Array<(string | null | Number)>} flogic filter logical
     * @param {Array<(string | null | Number)>} fvalues filter values
     */
    static select<T extends QueryResult>(table: string, selectColumns: Array<string> | null, fcolumns: (string | null | Number)[], flogic: (string | null | Number)[], fvalues: (string | null | Number)[]): Promise<T>;
    static insert<T extends QueryResult>(table: String, insertColumns: string[], columnValues: string[]): Promise<T>;
    static update<T extends QueryResult>(table: String, updateColumns: [string, any][], whereColumns?: [string, string, any, string | undefined][] | undefined): Promise<T>;
    /**
     *
     * @param table table name
     * @param whereColumns [column name, logic operator, value, and | or]
     * @returns
     */
    static drop<T extends QueryResult>(table: string, whereColumns: [string, any, any, string | undefined][]): Promise<T>;
}
export default Pool;
//# sourceMappingURL=dbPool.d.ts.map
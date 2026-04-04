import mysql, {} from 'mysql2/promise';
import Config from "./../lib/config.js";
const poolOptions = {
    host: Config.DB_HOST ? Config.DB_HOST : "",
    user: Config.DB_USR ? Config.DB_USR : "",
    password: Config.DB_PWD ? Config.DB_PWD : "",
    database: Config.DB_SCHEMA ? Config.DB_SCHEMA : "",
    port: Config.DB_PORT ? +Config.DB_PORT : 3306,
    connectionLimit: Config.DB_POOL ? +Config.DB_POOL : 5,
    waitForConnections: true,
};
class Pool {
    static _pool;
    static get() {
        if (this._pool == null) {
            this._pool = mysql.createPool(poolOptions);
        }
        return this._pool;
    }
    static async close() {
        if (this._pool !== null) {
            this._pool.end();
        }
        this._pool = null;
    }
    /**
     * SELECT query
     * @param {Array<(string | null | Number)>} table target tables
     * @param {Array<(string | null | Number)>} fcolumns filter columns
     * @param {Array<(string | null | Number)>} flogic filter logical
     * @param {Array<(string | null | Number)>} fvalues filter values
     */
    static async select(table, selectColumns, fcolumns, flogic, fvalues) {
        const connection = await this.get().getConnection();
        try {
            var cols = [];
            for (let i = 0; i < fcolumns.length; i++) {
                cols.push(`\`${fcolumns[i]}\` ${flogic[i]} ?`);
            }
            var scols = "*";
            if (selectColumns != null) {
                scols = selectColumns.join(",");
            }
            var sql = `SELECT ${scols} FROM \`${table}\` WHERE ${cols.join(" AND ")}`;
            // console.log(sql);
            const [rows, fields] = await connection.query(sql, fvalues);
            return rows;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        finally {
            connection.release();
        }
    }
    static async insert(table, insertColumns, columnValues) {
        const connection = await this.get().getConnection();
        try {
            var valMarkers = [];
            for (var i = 0; i < insertColumns.length; i++) {
                valMarkers[i] = "?";
            }
            const sql = `INSERT INTO \`${table}\` (${insertColumns.join(",")}) VALUES (${valMarkers.join(",")})`;
            // console.log(sql);
            const [rows, fields] = await connection.execute(sql, columnValues);
            return rows;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        finally {
            connection.release();
        }
    }
    static async update(table, updateColumns, whereColumns) {
        const connection = await this.get().getConnection();
        try {
            var ucols = [];
            var vcols = [];
            for (var i = 0; i < updateColumns.length; i++) {
                if (updateColumns[i]) {
                    const [key, val] = updateColumns[i] ?? [];
                    ucols.push(`${key} = ?`);
                    vcols.push(val);
                }
            }
            var wcols = [];
            if (whereColumns) {
                for (var i = 0; i < whereColumns.length; i++) {
                    if (whereColumns[i]) {
                        const [key, logic, val, andOr] = whereColumns[i] ?? [];
                        wcols.push(`${key} ${logic} ? ${andOr ? andOr : ""}`);
                        vcols.push(val);
                    }
                }
            }
            const sql = `UPDATE \`${table}\` SET (${ucols.join(",")}) WHERE (${wcols.join(" AND ")})`;
            const [rows, fields] = await connection.execute(sql, vcols);
            return rows;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        finally {
            connection.release();
        }
    }
    /**
     *
     * @param table table name
     * @param whereColumns [column name, logic operator, value, and | or]
     * @returns
     */
    static async drop(table, whereColumns) {
        const connection = await this.get().getConnection();
        try {
            var vcols = [];
            var wcols = [];
            if (whereColumns) {
                for (var i = 0; i < whereColumns.length; i++) {
                    if (whereColumns[i]) {
                        const [key, logic, val, andOr] = whereColumns[i] ?? [];
                        wcols.push(`${key} ${logic} ? ${andOr ? andOr : ""}`);
                        vcols.push(val);
                    }
                }
            }
            const sql = `DELETE FROM \`${table}\` WHERE (${wcols.join(" ")})`;
            const [rows, fields] = await connection.execute(sql, vcols);
            return rows;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        finally {
            connection.release();
        }
    }
}
export default Pool;
//# sourceMappingURL=dbPool.js.map
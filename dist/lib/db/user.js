import DbPool from "./../dbPool.js";
import {} from 'mysql2/promise';
import * as crypto from 'crypto';
export const UserRole = {
    Admin: "super",
    Spv: "spv",
    SalesSpv: "sales-spv",
    None: "-"
};
export class DbUser {
    static tableName = "usr";
    static keyId = "id";
    static keyUsrName = "user_name";
    static keyUsrPwd = "user_pwd";
    static keyUsrToken = "user_token";
    static keyUsrRole = "user_role";
    static keyPersonIdNumber = "person_id_number";
    static keyPersonName = "person_name";
    static keyPersonPhone = "person_phone";
    static keyCreatedAt = "created_at";
    static keyDeletedAt = "deleted_at";
    static keys(except) {
        const result = [];
        if (except == null)
            except = [];
        if (!except.includes(this.keyId))
            result.push(this.keyId);
        if (!except.includes(this.keyUsrName))
            result.push(this.keyUsrName);
        if (!except.includes(this.keyUsrPwd))
            result.push(this.keyUsrPwd);
        if (!except.includes(this.keyUsrToken))
            result.push(this.keyUsrToken);
        if (!except.includes(this.keyUsrRole))
            result.push(this.keyUsrRole);
        if (!except.includes(this.keyPersonIdNumber))
            result.push(this.keyPersonIdNumber);
        if (!except.includes(this.keyPersonName))
            result.push(this.keyPersonName);
        if (!except.includes(this.keyPersonPhone))
            result.push(this.keyPersonPhone);
        if (!except.includes(this.keyCreatedAt))
            result.push(this.keyCreatedAt);
        if (!except.includes(this.keyDeletedAt))
            result.push(this.keyDeletedAt);
        return result;
    }
    static generateToken(data) {
        return crypto
            .createHash('sha256')
            .update(data.usr_name + data.usr_pwd + data.person_id_number)
            .digest('hex');
    }
    static async createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS \`usr\` ( ` +
            `\`${this.keyId}\` BIGINT AUTO_INCREMENT NOT NULL,` +
            `\`${this.keyUsrName}\` VARCHAR(50) NOT NULL,` +
            `\`${this.keyUsrPwd}\` VARCHAR(300) NOT NULL,` +
            `\`${this.keyUsrToken}\` VARCHAR(400) NULL,` +
            `\`${this.keyUsrRole}\` ENUM('super','sales-spv','sales','-') NOT NULL DEFAULT '-' ,` +
            `\`${this.keyPersonIdNumber}\` VARCHAR(30) NULL,` +
            `\`${this.keyPersonName}\` VARCHAR(50) NOT NULL,` +
            `\`${this.keyPersonPhone}\` VARCHAR(30) NULL,` +
            `\`${this.keyCreatedAt}\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,` +
            `\`${this.keyDeletedAt}\` DATETIME NULL,` +
            `CONSTRAINT \`PRIMARY\` PRIMARY KEY (\`id\`),` +
            `CONSTRAINT \`usr_usr_name_unique\` UNIQUE (\`usr_name\`)` +
            `);`;
        var connection;
        try {
            connection = await DbPool.get().getConnection();
            await DbPool.get().execute(sql);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            connection?.release();
        }
    }
    /**
     *
     * @param fcolumns
     * @param flogics
     * @param fvalues
     * @returns
     */
    static async fetchAll(data) {
        var fcols = ["deleted_at"];
        var fls = ["is"];
        var fvs = [null];
        if (data != null) {
            if (data.filterColumns != null) {
                fcols = data.filterColumns.concat(fcols);
            }
            if (data.filterLogics != null) {
                fls = data.filterLogics.concat(fls);
            }
            if (data.filterValues != null) {
                fvs = data.filterValues.concat(fvs);
            }
        }
        return await DbPool.select(this.tableName, this.keys(), fcols, fls, fvs);
    }
    static async insert(data) {
        const cols = this.keys([this.keyCreatedAt, this.keyDeletedAt]);
        const values = [
            data.usr_name,
            data.usr_pwd,
            this.generateToken(data),
            data.usr_role,
            data.person_id_number,
            data.person_name,
            data.person_phone,
        ];
        return DbPool.insert(this.tableName, cols, values);
    }
    static async update(data) {
        var ucol = [];
        for (var key in this.keys([this.keyId, this.keyCreatedAt, this.keyDeletedAt])) {
            if (data[key]) {
                ucol.push([key, data[key]]);
            }
        }
        const wcols = [
            [this.keyId, "=", data[this.keyId], ""]
        ];
        return DbPool.update(this.tableName, ucol, wcols);
    }
}
;
export default DbUser;
//# sourceMappingURL=user.js.map
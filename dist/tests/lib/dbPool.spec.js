import { expect } from 'chai';
import { describe, after, it } from 'mocha';
import dbPool from "../../lib/dbPool.js";
describe('> lib/dbPool.js', () => {
    after(async () => {
        await dbPool.close();
    });
    it('insert() : affected rows = 1', function (done) {
        const cols = [
            'usr_name',
            'usr_pwd',
            'usr_role',
            'person_id_number',
            'person_name',
            'person_phone'
        ];
        const usr = [
            "fake 9",
            "fake 9",
            "sales",
            "123456790",
            "fake 1 name",
            "123456790"
        ];
        dbPool.insert("usr", cols, usr).then(function (result) {
            expect(result.affectedRows).to.equal(1);
            done();
        });
    });
});
//# sourceMappingURL=dbPool.spec.js.map
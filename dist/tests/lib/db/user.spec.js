import crypto from 'crypto';
import { expect } from 'chai';
import { describe } from 'mocha';
import DbUser, {} from "../../../lib/db/user.js";
describe('> lib/db/user.js', () => {
    it('generateToken() -> should match token"', async () => {
        const data = {
            usr_name: "hello",
            usr_pwd: "hello",
            usr_role: "Admin",
            person_id_number: "123",
            person_name: "my name hello",
            person_phone: "1234567890"
        };
        const matcher = crypto
            .createHash('sha256')
            .update(data.usr_name + data.usr_pwd + data.person_id_number)
            .digest('hex');
        expect(DbUser.generateToken(data)).to.equal(matcher);
    });
});
//# sourceMappingURL=user.spec.js.map
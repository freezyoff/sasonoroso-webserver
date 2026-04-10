import { expect } from 'chai';
import { describe } from 'mocha';
import Config from "./../config.js";
describe('> lib/config.js', () => {
    it('should match environment"', () => {
        expect(Config.env.trim()).equal('test');
        expect(Config.server.port).equal(parseInt('8000'));
    });
});

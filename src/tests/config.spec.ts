import { expect } from 'chai';
import {describe} from 'mocha'
import Config, {filePath, type} from './config.ts'

describe('> lib/config.js', () => {
    it('should match environment"', () => {
        expect(type.trim()).equal('test');
        expect(Config.SERVER_PORT).equal('8000');
    })
});
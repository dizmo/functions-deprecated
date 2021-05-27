/* eslint @typescript-eslint/no-empty-function: [off] */
import { deprecated } from '../lib';

import chai from 'chai';
const { expect } = chai;
import spies from 'chai-spies';
chai.use(spies);

describe('deprecated', () => {
    it('should exist', () => {
        expect(deprecated).to.not.be.an('undefined');
    });
    it('should be a function', () => {
        expect(deprecated).to.be.a('function');
    });
});

describe('deprecated', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should deprecate class method', () => {
        class MyClass {
            @deprecated()
            public method() {}
        }
        new MyClass().method();
        chai.expect(console.warn).to.have.been.called.with(
            '[DEPRECATED] MyClass.method'
        );
    });
    it('should deprecate class method w/a message', () => {
        class MyClass {
            @deprecated('a message')
            public method() {}
        }
        new MyClass().method();
        chai.expect(console.warn).to.have.been.called.with(
            '[DEPRECATED] MyClass.method: a message'
        );
    });
});

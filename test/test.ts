/* eslint @typescript-eslint/no-empty-function: [off] */
import { deprecated } from '../lib';
import { original } from '../lib';

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
            @deprecated
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method'
        );
    });
    it('should deprecate class method w/a message', () => {
        class MyClass {
            @deprecated('a message')
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a message'
        );
    });
    it('should deprecate class method w/a function', () => {
        class MyClass {
            @deprecated((self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a computed message'
        );
    });
});

describe('deprecated w/accessors', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should deprecate class property getter', () => {
        class MyClass {
            @deprecated
            public get property() {
                expect(this).to.be.instanceOf(MyClass);
                return 0;
            }
        }
        const instance_1 = new MyClass();
        instance_1.property;
        instance_1.property;
        const instance_2 = new MyClass();
        instance_2.property;
        instance_2.property;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
    it('should deprecate class property setter', () => {
        class MyClass {
            @deprecated
            public set property(value: number) {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.property = 1;
        instance_1.property = 2;
        const instance_2 = new MyClass();
        instance_2.property = 3;
        instance_2.property = 4;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
    it('should deprecate class property getter (& setter)', () => {
        class MyClass {
            @deprecated
            public get property() {
                expect(this).to.be.instanceOf(MyClass);
                return 0;
            }
            public set property(value: number) {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.property;
        instance_1.property = 1;
        instance_1.property;
        instance_1.property = 2;
        const instance_2 = new MyClass();
        instance_2.property;
        instance_2.property = 3;
        instance_2.property;
        instance_2.property = 4;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
    it('should deprecate class property (getter &) setter', () => {
        class MyClass {
            @deprecated
            public get property() {
                expect(this).to.be.instanceOf(MyClass);
                return 0;
            }
            public set property(value: number) {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.property;
        instance_1.property = 1;
        instance_1.property;
        instance_1.property = 2;
        const instance_2 = new MyClass();
        instance_2.property;
        instance_2.property = 3;
        instance_2.property;
        instance_2.property = 4;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
});

describe('deprecated w/static methods', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should deprecate class method', () => {
        class MyClass {
            @deprecated
            public static method() {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method'
        );
    });
    it('should deprecate class method w/a message', () => {
        class MyClass {
            @deprecated('a message')
            public static method() {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a message'
        );
    });
    it('should deprecate class method w/a function', () => {
        class MyClass {
            @deprecated((self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(self).to.eq(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public static method() {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a computed message'
        );
    });
});

describe('deprecated w/static accessors', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should deprecate class property getter', () => {
        class MyClass {
            @deprecated
            public static get property() {
                expect(this).to.eq(MyClass)
                return 0;
            }
        }
        MyClass.property;
        MyClass.property;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
    it('should deprecate class property setter', () => {
        class MyClass {
            @deprecated
            public static set property(value: number) {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.property = 1;
        MyClass.property = 2;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
    it('should deprecate class property getter (& setter)', () => {
        class MyClass {
            @deprecated
            public static get property() {
                expect(this).to.eq(MyClass)
                return 0;
            }
            public static set property(value: number) {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.property;
        MyClass.property = 1;
        MyClass.property;
        MyClass.property = 2;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
    it('should deprecate class property (getter &) setter', () => {
        class MyClass {
            @deprecated
            public static get property() {
                expect(this).to.eq(MyClass)
                return 0;
            }
            public static set property(value: number) {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.property;
        MyClass.property = 1;
        MyClass.property;
        MyClass.property = 2;
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.property'
        );
    });
});

describe('deprecated w/indexer', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should deprecate class method', () => {
        class MyClass {
            @deprecated(undefined, (self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return { name: self.constructor.name, key };
            })
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method'
        );
    });
    it('should deprecate class method w/a message', () => {
        class MyClass {
            @deprecated('a message', (self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return { name: self.constructor.name, key };
            })
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a message'
        );
    });
    it('should deprecate class method w/a computed message', () => {
        class MyClass {
            @deprecated((self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            }, (self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return { name: self.constructor.name, key };
            })
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a computed message'
        );
    });
});

describe('deprecated w/indexer & static methods', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should deprecate class method', () => {
        class MyClass {
            @deprecated(undefined, (self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return { name: self.constructor.name, key };
            })
            public static method() {
                expect(this).to.not.be.instanceOf(MyClass);
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method'
        );
    });
    it('should deprecate class method w/a message', () => {
        class MyClass {
            @deprecated('a message', (self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(self).to.eq(MyClass);
                expect(key).to.eq('method');
                return { name: self.constructor.name, key };
            })
            public static method() {
                expect(this).to.not.be.instanceOf(MyClass);
                expect(this).to.eq(MyClass);
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a message'
        );
    });
    it('should deprecate class method w/a computed message', () => {
        class MyClass {
            @deprecated((self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(self).to.eq(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            }, (self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(self).to.eq(MyClass);
                expect(key).to.eq('method');
                return { name: self.constructor.name, key };
            })
            public static method() {
                expect(this).to.not.be.instanceOf(MyClass);
                expect(this).to.eq(MyClass);
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[DEPRECATED] MyClass.method: a computed message'
        );
    });
});

describe('original', () => {
    it('should exist', () => {
        expect(original).to.not.be.an('undefined');
    });
    it('should be a function', () => {
        expect(original).to.be.a('function');
    });
});

describe('original', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should invoke original class method', () => {
        class MyClass {
            @deprecated
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance = new MyClass();
        original(instance.method).bind(instance)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a message', () => {
        class MyClass {
            @deprecated('a message')
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance = new MyClass();
        original(instance.method).bind(instance)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a computed message', () => {
        class MyClass {
            @deprecated((self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance = new MyClass();
        original(instance.method).bind(instance)();
        expect(console.warn).to.have.not.been.called();
    });
});

describe('original w/static methods', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should invoke original class method', () => {
        class MyClass {
            @deprecated
            public static method() {
                expect(this).to.not.be.instanceOf(MyClass);
                expect(this).to.eq(MyClass);
            }
        }
        original(MyClass.method).bind(MyClass)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a message', () => {
        class MyClass {
            @deprecated('a message')
            public static method() {
                expect(this).to.not.be.instanceOf(MyClass);
                expect(this).to.eq(MyClass);
            }
        }
        original(MyClass.method).bind(MyClass)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a computed message', () => {
        class MyClass {
            @deprecated((self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(self).to.eq(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public static method() {
                expect(this).to.eq(MyClass);
            }
        }
        original(MyClass.method).bind(MyClass)();
        expect(console.warn).to.have.not.been.called();
    });
});

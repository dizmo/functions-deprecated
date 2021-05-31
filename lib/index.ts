/* eslint @typescript-eslint/explicit-module-boundary-types: [off] */
/* eslint @typescript-eslint/no-explicit-any: [off] */
/* eslint @typescript-eslint/ban-types: [off] */
export declare type Message =
    string | ((self: any, key: string) => string | undefined);
export declare type Indexer =
    (self: any, key: string) => { class_name: string, key: string };
/**
 * Deprecates a class method.
 *
 * @param message deprecation text
 * @param indexer optional key mapper (defaults to `[class_name].[key]`)
 * @returns deprecated class method
 */
export function deprecated(
    message?: Message, indexer?: Indexer): Function;
/**
 * @ignore
 */
export function deprecated(
    target: any, key: string, dtor?: PropertyDescriptor): void;
/**
 * @ignore
 */
export function deprecated(
    arg0: Message | any, arg1?: Indexer | string, arg3?: PropertyDescriptor,
): Function | void {
    if (typeof arg0 === 'string' ||
        typeof arg0 === 'function' ||
        typeof arg0 === 'undefined'
    ) {
        if (typeof arg1 === 'function' ||
            typeof arg1 === 'undefined'
        ) {
            return _deprecated(arg0, arg1);
        }
    }
    return _deprecated(undefined)(
        arg0 as any, arg1 as string, arg3
    );
}
interface DeprecatedFunction extends Function {
    __deprecated__: Function
}
function _deprecated(
    message?: Message, indexer?: Indexer
) {
    const warn = {} as Record<string, Record<string, boolean>>;
    return function (
        target: any, key: string, dtor?: PropertyDescriptor
    ) {
        const wrap = (
            method: Function, callback: (w: DeprecatedFunction) => void
        ) => {
            const wrapped = function (this: any, ...args: any[]) {
                const class_name = this.name ?? this.constructor?.name ?? '';
                const index = indexer ? indexer(this, key) : {
                    class_name, key
                };
                if (warn[index.class_name] === undefined) {
                    warn[index.class_name] = {};
                }
                if (warn[index.class_name][index.key] === undefined) {
                    if (typeof message === 'function') {
                        const text = message(this, index.key);
                        if (typeof text === 'string') {
                            console.warn(`[DEPRECATED] ${class_name}.${key}: ${text}`);
                        }
                    } else if (typeof message === 'string') {
                        console.warn(`[DEPRECATED] ${class_name}.${key}: ${message}`);
                    } else {
                        console.warn(`[DEPRECATED] ${class_name}.${key}`);
                    }
                    warn[index.class_name][index.key] = false;
                }
                return method.apply(this, args);
            };
            wrapped.__deprecated__ = method;
            callback(wrapped as DeprecatedFunction);
        };
        if (dtor) {
            if (typeof dtor.value === 'function') {
                wrap(dtor.value, (wrapped) => {
                    dtor.value = wrapped;
                });
            } else {
                if (typeof dtor.get === 'function') {
                    wrap(dtor.get, (wrapped) => {
                        dtor.get = wrapped as any;
                    });
                }
                if (typeof dtor.set === 'function') {
                    wrap(dtor.set, (wrapped) => {
                        dtor.set = wrapped as any;
                    });
                }
            }
        } else {
            wrap(target[key], (wrapped) => {
                target[key] = wrapped;
            });
        }
    };
}
/**
 * @returns original method **unbound** to the original instance.
 */
export function original<T extends Function>(
    method: T
) {
    const deprecated_method = method as Function as DeprecatedFunction;
    if (typeof deprecated_method.__deprecated__ === 'function') {
        return deprecated_method.__deprecated__ as T;
    } else {
        return method;
    }
}
export default deprecated;

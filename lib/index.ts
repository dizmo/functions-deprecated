/* eslint @typescript-eslint/explicit-module-boundary-types: [off] */
/* eslint @typescript-eslint/no-empty-function: [off] */
/* eslint @typescript-eslint/no-explicit-any: [off] */
/* eslint @typescript-eslint/ban-types: [off] */
interface DeprecatedFunction extends Function {
    __deprecated__: Function
}
/**
 * @returns original method **unbound** to the original instance.
 */
export function undeprecated<T extends Function>(this: any, method: T) {
    return (method as unknown as DeprecatedFunction).__deprecated__ as T;
}
/**
 * Deprecates a class method.
 *
 * @param message deprecation text
 * @param indexer optional key mapper (defaults to `[cls_name].[key]`)
 * @returns deprecated class method
 */
export function deprecated(
    message?: string | ((self: any, key: string) => string | undefined),
    indexer?: (self: any, key: string) => { cls_name: string, key: string }
) {
    const warn = {} as Record<any, Record<string, boolean>>;
    return function (
        target: any, key: string, dtor?: PropertyDescriptor
    ) {
        const wrap = (
            method: Function, callback: Function,
        ) => {
            const wrapped = function (this: any, ...args: any[]) {
                const cls_name = this.constructor?.name ?? '';
                const index = indexer ? indexer(this, key) : {
                    cls_name, key
                };
                if (warn[index.cls_name] === undefined) {
                    warn[index.cls_name] = {};
                }
                if (warn[index.cls_name][index.key] === undefined) {
                    if (typeof message === 'function') {
                        const text = message(this, index.key);
                        if (typeof text === 'string') {
                            console.warn(`[DEPRECATED] ${cls_name}.${key}: ${text}`);
                        }
                    } else if (typeof message === 'string') {
                        console.warn(`[DEPRECATED] ${cls_name}.${key}: ${message}`);
                    } else {
                        console.warn(`[DEPRECATED] ${cls_name}.${key}`);
                    }
                    warn[index.cls_name][index.key] = false;
                }
                return method.apply(this, args);
            };
            wrapped.__deprecated__ = method;
            callback(wrapped);
        };
        if (dtor) {
            if (typeof dtor.value === 'function') {
                wrap(dtor.value, (wrapped: Function) => {
                    dtor.value = wrapped;
                });
            } else {
                if (typeof dtor.get === 'function') {
                    wrap(dtor.get, (wrapped: Function) => {
                        dtor.get = wrapped as any;
                    });
                }
                if (typeof dtor.set === 'function') {
                    wrap(dtor.set, (wrapped: Function) => {
                        dtor.set = wrapped as any;
                    });
                }
            }
        } else {
            wrap(target[key], (wrapped: Function) => {
                target[key] = wrapped;
            });
        }
    };
}
export default deprecated;

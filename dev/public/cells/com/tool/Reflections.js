export class Reflections {
    static watchers = Symbol('watchers');
    static values = Symbol('values');
    static watched = Symbol('watched');
    /**
     * 观察对象指定属性, 可多次观察
     * @param o 目标对象
     * @param prop 已有属性或新增属性
     * @param watcher 观察者, 相同观察者只能注册一次
     * @return 被观察对象
     */
    static watch(o, prop, watcher) {
        // 定义监听器映射
        const [watchersMapper] = this.constValue(o, Reflections.watchers, {});
        // 保存监听器
        watchersMapper[prop] = watchersMapper[prop] || [];
        const watchers = watchersMapper[prop];
        if (!watchers.includes(watcher)) {
            watchers.push(watcher);
        }
        // 值缓存
        const [values, isFirstSet] = this.constValue(o, Reflections.values, {});
        // 首次代理需要拷贝原有值
        if (isFirstSet) {
            Object.assign(values, o);
        }
        // 一个属性仅观察一次
        const [watchedMapper] = this.constValue(o, Reflections.watched, {});
        if (Reflect.has(watchedMapper, prop)) {
            return o;
        }
        // 观察属性
        const descriptor = Reflect.getOwnPropertyDescriptor(o, prop) ?? {
            configurable: true,
            enumerable: true,
        };
        Reflect.defineProperty(o, prop, {
            configurable: descriptor.configurable,
            enumerable: descriptor.enumerable,
            get: () => values[prop],
            set: (nv) => {
                const ov = values[prop];
                values[prop] = nv;
                watchers.forEach((watcher) => {
                    try {
                        watcher(nv, ov);
                    }
                    catch (e) {
                        console.warn(`观察者[${String(prop)}]执行错误`, e, watcher);
                    }
                });
            },
        });
        watchedMapper[prop] = true;
        return o;
    }
    /**
     * 设置常量属性
     * @param o 目标对象
     * @param prop 属性
     * @param value 值
     * @return [R, FirstSet]
     */
    static constValue(o, prop, value) {
        value = o[prop] ?? value;
        if (Reflect.has(o, prop)) {
            return [value, false];
        }
        const isOk = Reflect.defineProperty(o, prop, {
            value,
            configurable: true,
            enumerable: false,
            writable: false,
        });
        if (!isOk) {
            throw Error('属性代理失败');
        }
        return [value, true];
    }
}

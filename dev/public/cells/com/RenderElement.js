export class RenderElement extends HTMLElement {
    /**
     * 影子（根）节点
     */
    _root;
    /**
     * 属性定义
     * @private
     */
    static _attributes;
    /**
     * 属性监听映射
     * @private
     */
    _watchers = {};
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._root.appendChild(this.presetCss());
        this._root.appendChild(this.presetHtml());
        this.initEvent();
    }
    /**
     * 可观察属性定义
     */
    static get observedAttributes() {
        return [];
    }
    /**
     * 预置CSS
     */
    presetCss() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = this.css();
        return styleTag;
    }
    /**
     * 预置HTML
     */
    presetHtml() {
        const tpl = document.createElement('template');
        const html = this.html();
        if (typeof html === 'string') {
            tpl.innerHTML = html;
        }
        else {
            tpl.appendChild(html);
        }
        return tpl.content.cloneNode(true);
    }
    /**
     * 组件被挂载
     * @protected
     */
    connectedCallback() {
        console.log('Custom square element added to page.');
    }
    /**
     * 组件卸载
     */
    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }
    /**
     * 组件移动到新文档
     */
    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }
    /**
     * 属性变化
     * @param name 属性名
     * @param oldValue 旧值
     * @param newValue 新值
     */
    attributeChangedCallback(name, oldValue, newValue) {
        let re = this;
        let watcher = re._watchers[name];
        while (re && !watcher) {
            re = Object.getPrototypeOf(re);
            if (!(re instanceof RenderElement)) {
                console.warn('未定义监听: ', name);
                return;
            }
            watcher = re._watchers[name];
        }
        if (watcher) {
            watcher.bind(this)(oldValue, newValue);
        }
    }
    /**
     * 定义属性
     * @param attrs 属性列表
     */
    static defineAttributes(...attrs) {
        const attrMapper = attrs.reduce((r, e) => {
            r[e] = e;
            return r;
        }, {});
        return this.wrapWatcher(attrMapper);
    }
    /**
     * 包装为属性监听器
     * @param attrMapper 属性映射
     * @see defineAttributes
     */
    static wrapWatcher(attrMapper) {
        const defines = Object.keys(attrMapper);
        return {
            ...attrMapper,
            defines: defines,
            watchers: defines.reduce((wm, prop) => {
                wm[prop] = (target, fnKey) => {
                    if (!(target instanceof RenderElement)) {
                        throw Error('只能应用于 RenderElement 子类');
                    }
                    target._watchers = target._watchers || {};
                    if (fnKey in target._watchers) {
                        throw Error(`不允许重复监听属性: ${prop}`);
                    }
                    const originFn = target[fnKey];
                    target._watchers[prop] = (function (oldVal, newVal) {
                        const fnProxy = originFn.bind(this);
                        fnProxy(oldVal, newVal);
                    });
                };
                return wm;
            }, {}),
        };
    }
    /**
     * 初始化事件
     */
    initEvent() {
    }
}

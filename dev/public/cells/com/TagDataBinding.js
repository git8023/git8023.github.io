var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RenderElement } from './RenderElement.js';
import { Reflections } from './tool/Reflections.js';
// 定义属性
const defAttrs = RenderElement.defineAttributes('value', 'name');
class TagDataBinding extends RenderElement {
    // 属性值
    value;
    // 属性绑定记录
    binds = {
        // 数据对象
        target: {},
        // 代理符号
        // K - 控件属性名
        // V - 数据对象属性名
        proxySymbols: {},
    };
    constructor() {
        super();
    }
    static get observedAttributes() {
        return defAttrs.defines;
    }
    css() {
        return ' ';
    }
    html() {
        return `
      <input placeholder="数据单值双向绑定" />
    `;
    }
    initEvent() {
        //  keydown : 滞后一个字
        // keypress : 滞后一个字
        //    keyup : 滞后一个字
        //    input : value同步
        //   change : 失去焦点时
        this.views.input.addEventListener('input', () => {
            const bindSymbol = this.binds.proxySymbols.value;
            this.binds.target[bindSymbol] = this.views.input.value;
        });
    }
    /**
     * 持有视图引用
     */
    get views() {
        return {
            input: this.shadowRoot.querySelector('input'),
        };
    }
    /**
     * 监听value属性变化
     * @param oldVal 旧值
     * @param newVal 新值
     */
    watchValue(oldVal, newVal) {
        console.log('@defAttrs._watchers.value', oldVal, newVal);
        this.views.input.value = newVal;
    }
    /**
     * 提供类型化参数设置
     * @param attrName 属性名
     * @param attrValue 属性值
     */
    set(attrName, attrValue) {
        this.setAttribute(attrName, attrValue);
    }
    /**
     * 绑定指定对象特定属性到当前组件特定属性
     * @param o 外部对象
     * @param prop 对象属性
     * @param attr 组件属性
     * @see Object.defineProperty
     */
    bind(o, prop, attr) {
        // 保持数据对象引用
        this.binds.target = o;
        // 记录控件属性与数据对象属性映射关系
        this.binds.proxySymbols[attr] = String(prop);
        // 监听属性变化
        return Reflections.watch(o, prop, (newVal, oldVal) => {
            console.log(`Reflections.watch [${String(prop)}]`, oldVal, '-->', newVal);
            // 两次数据完全一致不修改控件属性
            if (newVal !== oldVal) {
                this.set(attr, newVal);
            }
        });
    }
}
__decorate([
    defAttrs.watchers.value,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TagDataBinding.prototype, "watchValue", null);
window.customElements.define('tag-data-binding', TagDataBinding);

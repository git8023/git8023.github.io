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
// 定义属性
const defAttrs = RenderElement.defineAttributes('value', 'name');
class TagDataBinding extends RenderElement {
    // 属性值
    value;
    // // 属性绑定记录
    // private binds = {
    //   // 数据对象
    //   target: {} as any,
    //   // 代理符号
    //   // K - 控件属性名
    //   // V - 数据对象属性名
    //   proxySymbols: {} as Record<Attributes, string>,
    // };
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
        this.views.input.addEventListener('input', () => {
            this.updateBindTarget('value', this.views.input.value);
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
        this.log('@defAttrs._watchers.value', oldVal, newVal);
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
     * 绑定对象属性发生变化时
     * @param attr 组件属性名
     * @param newVal 对象新值
     * @param oldVal 对象旧值
     * @param target 绑定的对象
     * @param prop 绑定的属性
     * @param isFirst 是否首次绑定
     */
    onBindValueChange(attr, newVal, oldVal, target, prop, isFirst) {
        const args = { target, attr, newVal, oldVal, prop, isFirst };
        this.log('@defAttrs.binds.value', args);
        this.set(attr, newVal);
    }
}
__decorate([
    defAttrs.watchers.value,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TagDataBinding.prototype, "watchValue", null);
__decorate([
    defAttrs.binds.value,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, TagDataBinding, String, Boolean]),
    __metadata("design:returntype", void 0)
], TagDataBinding.prototype, "onBindValueChange", null);
window.customElements.define('tag-data-binding', TagDataBinding);

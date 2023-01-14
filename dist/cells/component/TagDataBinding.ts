import { RenderElement } from './RenderElement.js';

// 定义属性
const defAttrs = RenderElement.defineAttributes('value', 'name');

// 属性类型
type Attributes = typeof defAttrs.defines;

class TagDataBinding extends RenderElement<Attributes> {
  // 属性值
  private value: string;

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

  protected css(): string {
    return ' ';
  }

  protected html(): HTMLElement | string {
    return `
      <input placeholder="数据单值双向绑定" />
    `;
  }

  protected initEvent() {
    this.views.input.addEventListener('input', () => {
      this.updateBindTarget('value', this.views.input.value);
    });
  }

  /**
   * 持有视图引用
   */
  private get views() {
    return {
      input: this.shadowRoot.querySelector('input'),
    };
  }

  /**
   * 监听value属性变化
   * @param oldVal 旧值
   * @param newVal 新值
   */
  @defAttrs.watchers.value
  watchValue(oldVal, newVal) {
    this.log('@defAttrs._watchers.value', oldVal, newVal);
    this.views.input.value = newVal;
  }

  /**
   * 提供类型化参数设置
   * @param attrName 属性名
   * @param attrValue 属性值
   */
  set(attrName: Attributes, attrValue: string) {
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
  @defAttrs.binds.value
  onBindValueChange(
    attr: Attributes,
    newVal: any,
    oldVal: any,
    target: TagDataBinding,
    prop: string,
    isFirst: boolean,
  ) {
    const args = { target, attr, newVal, oldVal, prop, isFirst };
    this.log('@defAttrs.binds.value', args);
    this.set(attr, newVal);
  }

}

window.customElements.define('tag-data-binding', TagDataBinding);

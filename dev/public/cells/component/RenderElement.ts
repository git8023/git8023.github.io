type AttributeMapper<P extends string> = Record<P, P>;
type Watcher<E extends RenderElement = any> = (target: E, fnKey: string) => void;
type WatcherMapper<P extends string> = Record<P, Watcher>;
type AttributeWatcher<P extends string> = AttributeMapper<P> & {
  watchers: WatcherMapper<P>;
  defines: P
}
type WatchHandler = (this: RenderElement, oldVal: string, newVal: string) => void;

export abstract class RenderElement extends HTMLElement {

  /**
   * 影子（根）节点
   */
  private readonly _root: ShadowRoot;

  /**
   * 属性定义
   * @private
   */
  private static _attributes: any;

  /**
   * 属性监听映射
   * @private
   */
  private _watchers: Record<string, WatchHandler> = {};

  protected constructor() {
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
    return [] as any;
  }

  /**
   * 预置CSS
   */
  private presetCss() {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = this.css();
    return styleTag;
  }

  /**
   * 预置HTML
   */
  private presetHtml() {
    const tpl = document.createElement('template');
    const html = this.html();
    if (typeof html === 'string') {
      tpl.innerHTML = html;
    } else {
      tpl.appendChild(html);
    }

    return tpl.content.cloneNode(true);
  }

  /**
   * 组件被挂载
   * @protected
   */
  protected connectedCallback() {
    console.log('Custom square element added to page.');
  }

  /**
   * 组件卸载
   */
  protected disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  /**
   * 组件移动到新文档
   */
  protected adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  /**
   * 属性变化
   * @param name 属性名
   * @param oldValue 旧值
   * @param newValue 新值
   */
  protected attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    let re: RenderElement = this;
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
  public static defineAttributes<P extends string>(...attrs: P[]): AttributeWatcher<P> {
    const attrMapper = attrs.reduce((r, e) => {
      r[e] = e;
      return r;
    }, {} as AttributeMapper<P>);
    return this.wrapWatcher(attrMapper);
  }

  /**
   * 包装为属性监听器
   * @param attrMapper 属性映射
   * @see defineAttributes
   */
  public static wrapWatcher<P extends string>(attrMapper: AttributeMapper<P>): AttributeWatcher<P> {
    const defines = Object.keys(attrMapper);
    return {
      ...attrMapper,
      defines: defines as any,
      watchers: defines.reduce((wm, prop: P) => {
        wm[prop] = (target: RenderElement, fnKey) => {
          if (!(target instanceof RenderElement)) {
            throw Error('只能应用于 RenderElement 子类');
          }

          target._watchers = target._watchers || {};
          if (fnKey in target._watchers) {
            throw Error(`不允许重复监听属性: ${prop}`);
          }

          const originFn: WatchHandler = target[fnKey];
          target._watchers[prop] = (function (oldVal, newVal) {
            const fnProxy = originFn.bind(this);
            fnProxy(oldVal, newVal);
          }) as WatchHandler;
        };
        return wm;
      }, {} as WatcherMapper<P>),
    };
  }

  /**
   * 初始化事件
   */
  protected initEvent() {
  }

  /**
   * 组件样式
   */
  protected abstract css(): string;

  /**
   * 组件模板
   */
  protected abstract html(): HTMLElement | string;

}

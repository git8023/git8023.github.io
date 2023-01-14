import { Reflections } from './tool/Reflections.js';

type AttributeMapper<P extends string> = Record<P, P>;
type Watcher<E extends RenderElement<any> = any> = (target: E, fnKey: string) => void;

type WatcherMapper<P extends string> = Record<P, Watcher>;
type InputBindMapper<P extends string> = Record<P, Watcher>;

type AttributeDefine<P extends string> = AttributeMapper<P> & {
  /** 属性列表 */
  defines: P;

  /** 组件属性变化监听 */
  watchers: WatcherMapper<P>;

  /**
   * 数据绑定. 绑定对象更新通知组件更新
   * @example
   * // Object[Prop] ==> RenderElement[Attr]
   * -@defAttrs.binds.value
   * bindValue(attr: Attributes, newVal: any, oldVal: any, target: TagDataBinding, prop: string) {
   *   const args = { target, attr, newVal, oldVal, prop };
   *   console.log('@defAttrs.binds.value', args);
   * }
   */
  binds: InputBindMapper<P>;

  // /**
  //  * 数据绑定. 组件更新落实到绑定对象更新
  //  * @example
  //  * // CustomElement[Attr] ==> Object[Prop]
  //  */
  // updates: OutputBindMapper<P>;
}
type WatchHandler = (this: RenderElement<any>, oldVal: string, newVal: string) => void;

/** 数据绑定: 输入处理 */
export interface DataBindHandler<Attr> {
  /**
   * @param target 目标对象
   * @param attr 控件属性
   * @param newVal 新值
   * @param oldVal 旧值
   */
  (target: object, attr: Attr, newVal: any, oldVal: any): void;
}

/**
 * 数据绑定
 */
interface DataBind<Attr extends string> {
  /** 数据对象 */
  target: object,
  /**
   * 代理符号
   *
   * K - 控件属性名
   *
   * V - 数据对象属性名
   */
  attrMapper: Record<Attr, string>,
  /**
   * (输入)数据更新处理器映射
   */
  inputHandlers: Record<Attr, DataBindHandler<Attr>>,
}

/**
 * 自定义组件基类
 */
export abstract class RenderElement<Attr extends string>
  extends HTMLElement {

  /**
   * 影子（根）节点
   */
  private readonly _root: ShadowRoot;

  /**
   * 属性监听映射
   * @private
   */
  private _watchers: Record<string, WatchHandler> = {};

  /** 属性绑定记录 */
  private _binds: DataBind<Attr> = {
    target: {} as any,
    attrMapper: {} as Record<Attr, string>,
    inputHandlers: {} as any,
  };

  private _logger: { log: (...args: any) => void } = console;

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
  public static get observedAttributes() {
    return [] as any;
  }

  /**
   * 定义属性
   * @param attrs 属性列表
   */
  public static defineAttributes<P extends string>(...attrs: P[]): AttributeDefine<P> {
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
  private static wrapWatcher<P extends string>(attrMapper: AttributeMapper<P>): AttributeDefine<P> {
    const defines = Object.keys(attrMapper);
    return {
      ...attrMapper,
      defines: defines as any,

      // 组件内属性数据监听
      watchers: defines.reduce((wm, prop: P) => {
        wm[prop] = (target: RenderElement<any>, fnKey) => {
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

      // 数据输入处理
      binds: defines.reduce((bm, prop: P) => {
        bm[prop] = (target: RenderElement<any>, fnKey) => {
          if (!(target instanceof RenderElement)) {
            throw Error('只能应用于 RenderElement 子类');
          }

          target._binds = target._binds || { inputHandlers: {} } as any;
          if (prop in target._binds) {
            throw Error(`[DataBind]不允许重复监听属性: ${prop}`);
          }

          const originFn: DataBindHandler<P> = target[fnKey];
          target._binds.inputHandlers[prop] = (function (...args) {
            const fnProxy = originFn.bind(this);
            fnProxy(...args);
          } as DataBindHandler<P>);
        };
        return bm;
      }, {} as InputBindMapper<P>),

      // 数据输出处理
      // updates: defines.reduce((bm, prop: P) => {
      //   bm[prop] = (target: RenderElement<any>, fnKey) => {
      //     if (!(target instanceof RenderElement)) {
      //       throw Error('只能应用于 RenderElement 子类');
      //     }
      //
      //     target._binds = target._binds || { outputHandlers: {} } as any;
      //     if (prop in target._binds) {
      //       throw Error(`[DataBind]不允许重复监听属性: ${prop}`);
      //     }
      //
      //     const originFn: DataBindHandler<P> = target[fnKey];
      //     target._binds.outputHandlers[prop] = (function (...args) {
      //       const fnProxy = originFn.bind(this);
      //       fnProxy(...args);
      //     } as DataUpdateHandler<P>);
      //   };
      //   return bm;
      // }, {} as OutputBindMapper<P>),
    };
  }

  /**
   * 绑定指定对象特定属性到当前组件特定属性
   * @param target 外部对象
   * @param prop 对象属性
   * @param attr 组件属性
   * @see Object.defineProperty
   */
  bind<T extends object>(target: T, prop: string | keyof T, attr: Attr) {
    // 保持数据对象引用
    this._binds.target = target;

    // 记录控件属性与数据对象属性映射关系
    this._binds.attrMapper[attr] = String(prop);

    // 首次绑定
    const newVal = target[prop as keyof T];
    this.execBindHandler(attr, newVal, undefined, target, prop, true);

    // 监听属性变化
    return Reflections.watch(target, prop, (newVal, oldVal) => {
      this.log(`Reflections.watch [${String(prop)}]`, oldVal, '-->', newVal);

      // 两次数据完全一致不触发
      if (newVal !== oldVal) {
        this.execBindHandler(attr, newVal, oldVal, target, prop);
      }
    });
  }

  /**
   * 设置日志记录对象
   * @param logger 日志记录对象
   */
  setLogger(logger: any) {
    this._logger = logger;
  }

  /**
   * 执行绑定处理
   * @param attr 组件属性名
   * @param newVal 新值
   * @param oldVal 旧值
   * @param target 目标对象
   * @param prop 对象属性
   * @param [isFirst=false] 是否首次绑定
   * @private
   */
  private execBindHandler<T>(
    attr: Attr,
    newVal,
    oldVal,
    target: T,
    prop: string | keyof T,
    isFirst = false,
  ) {
    // 交给具体实现处理
    let handler = this._binds.inputHandlers[attr];
    let ctx = this;
    while (!handler) {
      ctx = Object.getPrototypeOf(ctx);
      if (!(ctx instanceof RenderElement)) {
        this.log('未定义属性绑定处理器: ', attr);
        break;
      }
      handler = ctx._binds.inputHandlers[attr];
    }
    if (handler instanceof Function) {
      const fnProxy = handler.bind(this);
      fnProxy(attr, newVal, oldVal, target, prop, isFirst);
    }
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
    this.log('Custom square element added to page.');
  }

  /**
   * 组件卸载
   */
  protected disconnectedCallback() {
    this.log('Custom square element removed from page.');
  }

  /**
   * 组件移动到新文档
   */
  protected adoptedCallback() {
    this.log('Custom square element moved to new page.');
  }

  /**
   * 更新绑定的目标对象
   * @param attr 组件属性名
   * @param value 目标对象属性值
   * @protected
   */
  protected updateBindTarget(attr: Attr, value: any) {
    const prop = this._binds.attrMapper[attr];
    if (prop && prop in this._binds.target) {
      // @ts-ignore
      this._binds.target[prop] = value;
    }
  }

  /**
   * 属性变化
   * @param name 属性名
   * @param oldValue 旧值
   * @param newValue 新值
   */
  protected attributeChangedCallback(name: Attr, oldValue: string, newValue: string) {
    // 找到属性观察者
    let re: RenderElement<Attr> = this;
    let watcher = re._watchers[name];
    while (re && !watcher) {
      re = Object.getPrototypeOf(re);
      if (!(re instanceof RenderElement)) {
        console.warn('未定义监听: ', name);
        return;
      }
      watcher = re._watchers[name];
    }

    // 通知观察者处理
    if (watcher) {
      const watcherProxy = watcher.bind(this);
      watcherProxy(oldValue, newValue);
    }
  }

  /**
   * 初始化事件
   */
  protected initEvent() {
  }

  /**
   * 设置属性绑定处理器
   * @param attr 属性
   * @param handler 处理函数
   * @protected
   */
  protected setBindHandler(attr: Attr, handler: DataBindHandler<Attr>) {
    this._binds.inputHandlers[attr] = handler;
    return this;
  }

  /**
   * 打印日志
   * @param args 日志信息
   * @protected
   */
  protected log(...args: any) {
    const logger = this._logger || console;
    logger.log(...args);
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

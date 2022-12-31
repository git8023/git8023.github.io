import { OpenApiCommons } from '@/tools/open-api/OpenApiCommons';
import { Cast, fns, Jsons } from '@hyong8023/tool-box';

export class Template<K extends string> {
  private _content!: string;
  private _result!: string;

  /**
   * @example
   * K - 占位符名称
   * V - 占位符名称
   */
  readonly keyMapper: Record<K, string> = Cast.as();

  constructor(private keys: K[]) {
    this.keyMapper = keys.reduce((r, e) => {
      r[e] = e;
      return r;
    }, {} as Record<K, string>);
  }

  /**
   * 获取处理结果
   */
  get result() {
    const content = OpenApiCommons.trimEmptyRows(this._result);
    this._result = Cast.nil;
    return `${content}\n`;
  }

  /**
   * 设置模板文本字符串
   * @param getter 获取文本字符串
   */
  setContent(getter: fns.Handler<Record<K, string>, string>): Template<K> {
    this._content = getter(this.keyMapper);
    return this;
  }

  /**
   * 替换占位符
   * @param key 占位符
   * @param value 值
   *
   * @see keyMapper
   */
  replace(key: string, value: string): Template<K> {
    this._result = (this._result ?? this._content).replace(key, value);
    return this;
  }

  /**
   * 替换所有占位符
   * @param map 占位符映射
   */
  replaceAll(map: Record<K, string>): Template<K> {
    Jsons.foreach(map, ({ item: value, index: placeholder }) => {
      this.replace(placeholder, value);
    });
    return this;
  }

  /**
   * 克隆当前配置并替换占位符
   * @param map 占位符映射
   * @return 新的模板对象
   */
  cloneReplaceAll(map: Record<K, string>): Template<K> {
    const nt = new Template([...this.keys]);
    nt._result = this._content;
    return nt.replaceAll(map);
  }
}

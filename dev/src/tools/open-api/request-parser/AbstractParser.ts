import { PathParser } from '@/tools/open-api/request-parser/PathParser';
import { openApi } from '@/type/open-api';

export type Operation =
  openApi.GetOperation
  | openApi.PutOperation
  | openApi.PostOperation
  | openApi.DeleteOperation;

/** 模板 */
export interface Template {
  /** 模板 */
  content: string;
  /** 模板中的占位符 */
  placeholder: string[];
}

export abstract class AbstractParser<T extends Operation> implements PathParser {
  private _operation!: T;
  private _path!: string;
  private _root!: openApi.Root;

  protected constructor(private _method: keyof openApi.MethodMapper) {
  }

  init(
    path: string,
    operation: openApi.GetOperation | openApi.PutOperation | openApi.PostOperation
               | openApi.DeleteOperation,
    root: openApi.Root,
  ): AbstractParser<T> {
    this._path = path;
    this._operation = operation as T;
    this._root = root;
    return this;
  }

  get operation() {
    return this._operation as T;
  }

  get path() {
    return this._path;
  }

  get method() {
    return this._method;
  }

  get root() {
    return this._root;
  }

  /**
   * 解析结果
   */
  abstract get result(): string;

  /**
   * 模板
   */
  abstract get templateDefine(): Template;

  /**
   * 开始解析
   */
  abstract parse(): AbstractParser<T>;
}

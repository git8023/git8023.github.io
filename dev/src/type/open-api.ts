export namespace openApi {
  /** 主要类型 */
  export type PrimaryType = 'integer' | 'string' | 'array' | 'boolean';

  /** 文档根节点 */
  export interface Root {
    /** 主机 */
    host: string;
    /** 根路径 */
    basePath: string;
    /** 标记 */
    tags: Tag[];
    /** API定义 */
    paths: PathMapper;
    /** 数据结构定义 */
    definitions: SchemaDefineMapper;
  }

  /** 标记 */
  export interface Tag {
    /** 名称 */
    name: string;
    /** 描述 */
    description: string;
  }

  /**
   * 路径映射
   *
   * K - 请求地址
   *
   * V - 请求方式定义
   *
   * @example
   * {
   *   "/foo": MethodMapper,
   *   "/foo/bar": MethodMapper,
   * }
   */
  export interface PathMapper {
    [s: string]: MethodMapper;
  }

  /** 请求方式 */
  export interface MethodMapper {
    /** Method:GET */
    get?: GetOperation;
    /** Method:PUT */
    put?: PutOperation;
    /** Method:POST */
    post?: PostOperation;
    /** Method:DELETE */
    delete?: DeleteOperation;
  }

  /** 请求参数 */
  export interface ParameterDefine {
    /** 参数名 */
    name: string,
    /** 参数位置 */
    in: 'path' | 'body',
    /** 参数描述 */
    description: string,
    /** 是否必须 */
    required: true,
    /** 参数类型 */
    type: 'string'
  }

  /** 响应定义 */
  export interface ResponseDefine {
    200: ResponseDefine200;
  }

  /** Response Status: 200 */
  export interface ResponseDefine200 {
    /** 描述 */
    description: 'ok' | string;
    /** 数据结构 */
    schema: ResponseSchema;
  }

  /** 响应结构纲要 */
  export interface ResponseSchema {
    /** 节点路径，#标识根路径 */
    $ref: string;
    /** definitions 中定义的对象节点索引 */
    originalRef: string;
    /** 主要类型 */
    type: PrimaryType;
  }

  /**
   * GET 请求
   */
  export interface GetOperation {
    /**
     * 名称
     * @see Tag.name
     */
    tags: string[];
    /** 备注 */
    summary: string;
    /** 请求参数 */
    parameters: ParameterDefine[];
    /** 响应定义 */
    responses: ResponseDefine;
    /** 是否已废弃 */
    deprecated: boolean;
  }

  /** PUT 请求 */
  export interface PutOperation extends GetOperation {
    /** 接受的数据结构类型 */
    consumes: 'application/json' | string;
  }

  /** POST 请求 */
  export type PostOperation = PutOperation;

  /** DELETE 请求 */
  export type DeleteOperation = GetOperation;

  /**
   * 数据结构映射
   *
   * K - 结构唯一关键字
   *
   * V - 数据结构纲要
   */
  export interface SchemaDefineMapper {
    [s: string]: SchemaDefine;
  }

  /** 数据纲要 */
  export interface SchemaDefine {
    /** 结构类型 */
    type: 'object';
    /** 结构名称 */
    title: string;
    /** 数据属性定义 */
    properties: SchemaPropertiesDefine;
  }

  /** 数据结构所有属性定义 */
  export interface SchemaPropertiesDefine {
    [s: string]: SchemaProperty;
  }

  /** 数据结构单个属性定义 */
  export interface SchemaProperty {
    /** 类型 */
    type: PrimaryType;
    /** 描述 */
    description: string;
    /** 枚举（字面量）取值范围 */
    enum: string[];
    /** 数组元素类型 */
    items: ResponseSchema;
  }
}

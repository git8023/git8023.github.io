import { OpenApiCommons } from '@/tools/open-api/OpenApiCommons';
import { Template } from '@/tools/open-api/Template';
import { openApi } from '@/type/open-api';
import { Arrays, BError, Cast, Validation } from '@hyong8023/tool-box';

export type Operation =
  openApi.GetOperation
  | openApi.PutOperation
  | openApi.PostOperation
  | openApi.DeleteOperation;

export class PathParser {
  private operation!: Operation;
  private path!: string;
  private root!: openApi.Root;
  private _result!: string;

  /** 模板 */
  private tpl = new Template([
    '$description$', '$path$', '$api_method_name$', '$return_type$', '$parameter_type$',
    '$path_variable_type$',
  ]);

  constructor(private method: keyof openApi.MethodMapper) {
    this.setTplContent();
  }

  /**
   * 初始化
   * @param path 请求路径
   * @param operation 请求定义
   * @param root 根文档
   */
  init(
    path: string,
    operation: openApi.GetOperation | openApi.PutOperation | openApi.PostOperation
               | openApi.DeleteOperation,
    root: openApi.Root,
  ): PathParser {
    this.path = path;
    this.operation = operation;
    this.root = root;
    return this;
  }

  /** 标签映射 */
  get tagNamedMapper() {
    return Arrays.toMap(this.root.tags, 'name');
  }

  /** 获取类名 */
  get className() {
    const tagName = this.operation.tags[0];
    const tag = this.tagNamedMapper[tagName];
    return tag.description.replaceAll(' ', '');
  }

  /** 接口描述 */
  get description() {
    return this.operation.summary;
  }

  /** 方法名 */
  get methodName() {
    const pathSp = this.path.split('/').reverse();
    let apiMethodName = '';
    for (const item of pathSp) {
      if (!item.includes('{')) {
        apiMethodName = item;
        break;
      }
    }
    const suffix = this.method.split('').map((e, i) => (i === 0 ? e.toUpperCase() : e)).join('');
    return `${apiMethodName}${suffix}`;
  }

  /** 返回类型 */
  get returnType() {
    const status200 = this.operation.responses[200];
    if (!('type' in status200.schema)) {
      const referType = this.repairReferType(status200.schema.originalRef);
      return `entity.${referType}`;
    }

    if (status200.schema.type === 'array') {
      const referType = this.repairReferType(status200.schema.items.originalRef);
      return `entity.${referType}`;
    }

    return status200.schema.type;
  }

  /** 请求参数分组 */
  get paramPosGroup() {
    const parameters = this.operation.parameters || [];
    return Cast.as<Record<openApi.ParameterDefine['in'], openApi.ParameterDefine[]>>(
      Arrays.group(
        parameters,
        'in',
      ));
  }

  /** 查询参数类型 */
  get queryParamType() {
    return this.extractParamsDefine('query');
  }

  /** 路径参数类型 */
  get pathVariableType() {
    return this.extractParamsDefine('path');
  }

  /**
   * 解析结果
   */
  get result(): string {
    return this._result;
  }

  /**
   * 提取参数类型
   * @param type 参数类型
   */
  extractParamsDefine(type: openApi.ParameterDefine['in']): string {
    if (!(type in this.paramPosGroup)) {
      return 'void';
    }

    const typeProps = this.paramPosGroup[type]
      .map((item) => {
        const typeRepaired = OpenApiCommons.typeRepair(item.type);
        const fieldName = OpenApiCommons.fieldNameRepair(item.name);
        return item.name !== fieldName ? undefined : `${fieldName}: ${typeRepaired}`;
      })
      .filter((e) => Validation.notNil(e))
      .join(', ');
    return `{${typeProps}}`;
  }

  /**
   * 开始解析
   */
  parse(): PathParser {
    this._result = this.tpl.cloneReplaceAll({
      $description$: this.operation.summary,
      $path$: this.path,
      $api_method_name$: this.methodName,
      $return_type$: this.returnType,
      $parameter_type$: this.queryParamType,
      $path_variable_type$: this.pathVariableType,
    }).result;

    return this;
  }

  /**
   * 设置模板内容
   */
  private setTplContent() {
    let cfg = { decorator: '-decorator-', methodType: '-methodType-' };
    switch (this.method) {
      case 'get':
        cfg = { decorator: 'Get', methodType: 'GetMapping' };
        break;
      case 'put':
        cfg = { decorator: 'Put', methodType: 'PostMapping' };
        break;
      case 'post':
        cfg = { decorator: 'Post', methodType: 'PostMapping' };
        break;
      case 'delete':
        cfg = { decorator: 'Delete', methodType: 'GetMapping' };
        break;
      default:
        BError.throwError(`不支持的操作: ${this.method}`);
    }

    this.tpl.setContent((km) => `/** ${km.$description$} */
@${cfg.decorator}('${km.$path$}')
static readonly ${km.$api_method_name$}: vmsNet.${cfg.methodType}<${km.$return_type$}, ${km.$parameter_type$}, ${km.$path_variable_type$}>`);
  }

  /**
   * 修复引用类型
   * @param referType 原始引用
   * @private
   */
  private repairReferType(referType: string): string {
    // entity.PageResult«EquipmentCollectDataEntity对象»
    referType = referType.replace('«', '<entity.')
                         .replace('»', '>');
    return OpenApiCommons.repairInvalidChars(referType);
  }
}

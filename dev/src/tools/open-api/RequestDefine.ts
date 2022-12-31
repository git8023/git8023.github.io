import { OpenApiCommons } from '@/tools/open-api/OpenApiCommons';
import { PathParser } from '@/tools/open-api/PathParser';
import { Template } from '@/tools/open-api/Template';
import { openApi } from '@/type/open-api';
import { Cast, Jsons, Logs, Validation } from '@hyong8023/tool-box';

type Method = keyof openApi.MethodMapper;

/** 请求定义 */
export class RequestDefine {
  private static readonly PARSER_MAPPER: Record<Method, PathParser> = {
    get: new PathParser('get'),
    put: new PathParser('put'),
    post: new PathParser('post'),
    delete: new PathParser('delete'),
  };

  private results: string[] = [];

  className: string = Cast.nil;

  /**
   * @param path 请求地址
   * @param methods 请求方式映射
   * @param root 文档
   */
  constructor(
    private path: string,
    private methods: openApi.MethodMapper,
    private readonly root: openApi.Root,
  ) {
    this.parse();
  }

  /**
   * 获取处理结果
   */
  static result(className: string, rds: RequestDefine[]) {
    const filePlaceholder = new Template(['$class_name$', '$methods$'])
      .setContent((mapper) => `import { Delete, Get, Post, Put, vmsNet } from '@hyong8023/tool-box';

export class ${mapper.$class_name$} {\n${mapper.$methods$}\n}`);
    const { result } = filePlaceholder
      .replace(filePlaceholder.keyMapper.$class_name$, className)
      .replace(
        filePlaceholder.keyMapper.$methods$,
        rds.reduce((r, rd) => {
             r.push(...rd.results);
             return r;
           }, [] as string[])
           .map(OpenApiCommons.fixWhitespace)
           .join('\n'),
      );
    return result;
  }

  /**
   * 解析请求路径定义
   * @private
   */
  private parse() {
    Jsons.foreach(this.methods, ({ item: operation, index: method }) => {
      const parser = RequestDefine.PARSER_MAPPER[method as Method]!;
      if (Validation.isNil(parser)) {
        Logs.warn(`暂不支持此请求方式: ${method.toUpperCase()}`);
        return;
      }

      const pathParser = parser.init(this.path, operation!, this.root);
      this.className = this.className ?? pathParser.className;
      const { result } = pathParser.parse();
      this.results.push(result);
    });
  }
}

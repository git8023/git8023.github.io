/** 请求定义 */
import { Operation } from '@/tools/open-api/request-parser/AbstractParser';
import { GetParser } from '@/tools/open-api/request-parser/GetParser';
import { PathParser } from '@/tools/open-api/request-parser/PathParser';
import { openApi } from '@/type/open-api';
import { Jsons } from '@hyong8023/tool-box';

type Method = keyof openApi.MethodMapper;

export class RequestDefine {
  // todo 注册 XxxOperation 解析器
  private static readonly PARSER_MAPPER: Partial<Record<Method, PathParser>> = {
    get: new GetParser(),
  };

  private results: string[] = [];

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
   * 解析请求路径定义
   * @private
   */
  private parse() {
    Jsons.foreach(this.methods, ({ item: operation, index: method }) => {
      const parser = RequestDefine.PARSER_MAPPER[method as Method]!;
      const { result } = parser.init(this.path, operation as Operation, this.root).parse();
      this.results.push(result);
    });
  }
}

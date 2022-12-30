import { openApi } from '@/type/open-api';

/**
 * 请求解析器
 */
export interface PathParser {

  /** 请求方式 */
  readonly method: keyof openApi.MethodMapper;

  /** 请求地址 */
  path: string;

  /** 解析结果 */
  result: string;

  /**
   * 初始化
   * @param path 请求路径
   * @param operation 请求选项
   * @param root 文档
   */
  init(
    path: string,
    operation: openApi.GetOperation | openApi.PutOperation | openApi.PostOperation
               | openApi.DeleteOperation,
    root: openApi.Root,
  ): PathParser;

  /**
   * 解析请求选项
   */
  parse(): PathParser;
}

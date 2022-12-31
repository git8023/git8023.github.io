import { openApi } from '@/type/open-api';

export class OpenApiCommons {
  /** 空白对齐 */
  public static readonly whitespace = new Array(2).fill(' ').join('');

  /**
   * 修复空格
   * @param lineContent 一行内容
   */
  static fixWhitespace(lineContent: string): string {
    return lineContent.split('\n')
                      .map((e) => OpenApiCommons.whitespace + e)
                      .join('\n');
  }

  /**
   * 修复每一行的空格
   * @param content 多行内容
   * @param [trimEmptyRow=true] 修复空格行
   */
  static fixWhitespaceRows(content: string, trimEmptyRow = true): string {
    const r = content.split('\n').map(OpenApiCommons.fixWhitespace).join('\n');
    return trimEmptyRow ? OpenApiCommons.trimEmptyRows(r) : r;
  }

  /**
   * 类型映射
   * @param type openApi类型
   */
  static typeRepair(type: openApi.PrimaryType): openApi.JSTypeString {
    switch (type) {
      case 'integer':
        return 'number';
      case 'array':
        return '[]';
      case 'string':
      case 'boolean':
      default:
        return type;
    }
  }

  /**
   * 全空格的行只保留换行符
   * @param content 内容
   */
  static trimEmptyRows(content: string): string {
    return (content ?? '').split('\n')
                          .map((e) => (e.trim().length === 0 ? '' : e))
                          .join('\n');
  }

  /**
   * 替换非法字符
   * @param content 内容
   */
  static repairInvalidChars(content: string): string {
    return content.replaceAll(/([^a-z0-9_$<>.])+/ig, '');
  }

  /**
   * 字段名修正
   * @param name 字段名
   */
  static fieldNameRepair(name: string): string {
    return /[^a-z0-9_$]/ig.test(name) ? `'${name}'` : name;
  }
}

export class OpenApiCommons {
  /** 空白对齐 */
  public static readonly whitespace = new Array(2).fill(' ').join('');

  /**
   * 修复空格
   * @param lineContent 一行内容
   */
  static fixWhitespace(lineContent: string): string {
    return lineContent.split('\n')
                      .map((e) => this.whitespace + e)
                      .join('\n');
  }
}

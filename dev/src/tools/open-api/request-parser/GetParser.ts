import { AbstractParser, Template } from '@/tools/open-api/request-parser/AbstractParser';
import { openApi } from '@/type/open-api';

/** GET 请求解析器 */
export class GetParser extends AbstractParser<openApi.GetOperation> {
  /** 接口描述 */
  get description() {
    return this.operation.summary;
  }

  constructor() {
    super('get');
  }

  parse(): GetParser {
    // todo 实现 GET 请求解析
    return this;
  }

  get result(): string {
    return '';
  }

  get templateDefine(): Template {
    return {
      content: `
export class {NAME} {
  {METHODS}
}
      `,
      placeholder: ['NAME', 'METHODS'],
    };
  }
}

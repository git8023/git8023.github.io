import { OpenApiCommons } from '@/tools/open-api/OpenApiCommons';
import { openApi } from '@/type/open-api';
import { Jsons } from '@hyong8023/tool-box';

/** 数据结构定义 */
export class DataDefinition {
  /** 数据结构模板 */
  static readonly tpl = `
export interface {NAME} {
  {PROPS}
}`;

  /** 属性模板 */
  static readonly propTpl = `
/** {description} */
{fieldName}: {type};`;

  private placeholders = {
    NAME: '',
    PROPS: '',
  };
  private props: Array<{
    fieldName: string;
    type: openApi.PrimaryType;
    description: string;
  }> = [];
  private _result!: string;

  /** 解析结果 */
  get result() {
    return this._result;
  }

  constructor(private schemaDefine: openApi.SchemaDefine) {
    this.parse();
  }

  /**
   * 解析数据定义
   */
  parse() {
    this.placeholders.NAME = this.schemaDefine.title;
    Jsons.foreach(this.schemaDefine.properties, ({ item, index }) => {
      this.props.push({
        fieldName: index,
        type: item.type,
        description: item.description,
      });
    });

    const propList = this.props.reduce((r, iter) => {
      const propStr = DataDefinition.propTpl.replaceAll(/(\{[^{}]+})/g, (s) => {
        const prop = s.replaceAll(/[{}]/g, '');
        return iter[prop as keyof typeof iter];
      });
      r.push(OpenApiCommons.fixWhitespace(propStr));
      return r;
    }, [] as string[]);
    this.placeholders.PROPS = propList.map(OpenApiCommons.fixWhitespace).join('\n');

    this._result = DataDefinition.tpl.replaceAll(/(\{[^{}]+})/g, (s) => {
      const prop = s.replaceAll(/[{}]/g, '');
      return this.placeholders[prop as keyof typeof this.placeholders];
    });
  }
}

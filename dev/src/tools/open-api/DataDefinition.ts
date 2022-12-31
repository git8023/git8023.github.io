import { OpenApiCommons } from '@/tools/open-api/OpenApiCommons';
import { Template } from '@/tools/open-api/Template';
import { openApi } from '@/type/open-api';
import { Jsons } from '@hyong8023/tool-box';

/** 数据结构定义 */
export class DataDefinition {
  /** 数据结构模板 */
  private static readonly beanTpl = new Template(['$name$', '$props$'])
    .setContent((km) => `export interface ${km.$name$} {\n${km.$props$}\n}`);

  /** 属性模板 */
  private static readonly propTpl = new Template(['$description$', '$fieldName$', '$type$'])
    .setContent((km) => `/** ${km.$description$} */\n${km.$fieldName$}: ${km.$type$};`);

  private props: Array<{
    fieldName: string;
    type: openApi.JSTypeString;
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
    Jsons.foreach(this.schemaDefine.properties, ({ item, index }) => {
      this.props.push({
        fieldName: index,
        type: OpenApiCommons.typeRepair(item.type),
        description: item.description,
      });
    });

    // properties
    const propLines = this.props.map((e) => DataDefinition.propTpl.cloneReplaceAll({
      $fieldName$: e.fieldName,
      $description$: e.description,
      $type$: e.type,
    }).result);

    // interface
    this._result = DataDefinition.beanTpl.replaceAll({
      $name$: OpenApiCommons.repairInvalidChars(this.schemaDefine.title),
      $props$: OpenApiCommons.fixWhitespaceRows(propLines.join('\n')),
    }).result;
  }
}

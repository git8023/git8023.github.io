import { openApi } from '@/type/open-api';
import { Jsons } from '@hyong8023/tool-box';

export class OpenApis {
  public static readonly whitespace = new Array(2).fill(' ').join('');

  /** 根文档 */
  private static root: openApi.Root;

  static transfer(root: openApi.Root) {
    this.root = root;
    const definitions = this.extractDefinitions();
    return {
      entities: () => this.generateEntities(definitions),
    };
  }

  /**
   * 提取数据结构定义
   * @private
   */
  private static extractDefinitions(): DataDefinition[] {
    return Object.values(this.root.definitions)
                 .filter((e) => e.type === 'object')
                 .reduce((result, schemaDefine) => {
                   const dataDefinition = new DataDefinition(schemaDefine);
                   result.push(dataDefinition);
                   return result;
                 }, [] as DataDefinition[]);
  }

  /**
   * 生成 entity 文件内容
   * @param definitions 结构定义
   * @private
   */
  private static generateEntities(definitions: DataDefinition[]): string {
    const placeholder = '{ENTITIES}';
    const tpl = `
export namespace entity {
  ${placeholder}
}`;
    const entities = definitions.reduce((result, item) => {
      result.push(item.result);
      return result;
    }, [] as string[]);

    return tpl.replace(
      placeholder,
      entities.map(this.fixWhitespace).join('\n'),
    );
  }

  static fixWhitespace(s: string): string {
    return s.split('\n')
            .map((e) => OpenApis.whitespace + e)
            .join('\n');
  }
}

class DataDefinition {
  static readonly tpl = `
export interface {NAME} {
  {PROPS}
}`;
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
      r.push(OpenApis.fixWhitespace(propStr));
      return r;
    }, [] as string[]);
    this.placeholders.PROPS = propList.map((e) => OpenApis.whitespace + e).join('\n');

    this._result = DataDefinition.tpl.replaceAll(/(\{[^{}]+})/g, (s) => {
      const prop = s.replaceAll(/[{}]/g, '');
      return this.placeholders[prop as keyof typeof this.placeholders];
    });
  }
}

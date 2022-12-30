import { DataDefinition } from '@/tools/open-api/DataDefinition';
import { OpenApiCommons } from '@/tools/open-api/OpenApiCommons';
import { RequestDefine } from '@/tools/open-api/RequestDefine';
import { openApi } from '@/type/open-api';
import { Jsons } from '@hyong8023/tool-box';

export class OpenApis {
  /** 根文档 */
  private static root: openApi.Root;

  /**
   * 开始转换
   * @param root 根文档JSON
   */
  static transfer(root: openApi.Root) {
    this.root = root;
    const definitions = this.extractDefinitions();
    this.extractPaths();
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
      entities.map(OpenApiCommons.fixWhitespace).join('\n'),
    );
  }

  /**
   * 提取请求路径定义
   * @private
   */
  private static extractPaths() {
    const rds: RequestDefine[] = [];
    Jsons.foreach(this.root.paths, ({ item: operation, index: path }) => {
      const requestDefine = new RequestDefine(path, operation, this.root);
      rds.push(requestDefine);
    });
  }
}

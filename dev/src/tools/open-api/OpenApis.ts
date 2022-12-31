import { DataDefinition } from '@/tools/open-api/DataDefinition';
import { OpenApiCommons } from '@/tools/open-api/OpenApiCommons';
import { RequestDefine } from '@/tools/open-api/RequestDefine';
import { Template } from '@/tools/open-api/Template';
import { openApi } from '@/type/open-api';
import { Arrays, Cast, Jsons, types } from '@hyong8023/tool-box';

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
    return {
      entities: () => this.generateEntities(definitions),
      apis: this.extractPaths(),
    };
  }

  /**
   * 提取数据结构定义
   * @private
   */
  private static extractDefinitions(): DataDefinition[] {
    return Object.values(this.root.definitions)
                 .filter((e) => e.type === 'object')
                 .filter((e) => !e.title.includes('«'))
                 .map((schemaDefine) => new DataDefinition(schemaDefine));
  }

  /**
   * 生成 entity 文件内容
   * @param definitions 结构定义
   * @private
   */
  private static generateEntities(definitions: DataDefinition[]): string {
    const entities = definitions.map(({ result }) => result)
                                .map(OpenApiCommons.fixWhitespace)
                                .join('\n');
    return new Template(['$classes$'])
      .setContent((km) => `export namespace entity {\n${km.$classes$}\n}`)
      .replaceAll({ $classes$: entities })
      .result;
  }

  /**
   * 提取请求路径定义
   * @private
   */
  private static extractPaths(): types.RecordS<string> {
    const rds: RequestDefine[] = [];
    Jsons.foreach(this.root.paths, (iter) => {
      const requestDefine = new RequestDefine(iter.index, iter.item, this.root);
      rds.push(requestDefine);
    });

    const result: types.RecordS<string> = Cast.as();
    Jsons.foreach(
      Arrays.group(rds, 'className'),
      ({ item: rds, index: className }) => {
        result[className] = RequestDefine.result(className, rds);
      },
    );

    return result;
  }
}

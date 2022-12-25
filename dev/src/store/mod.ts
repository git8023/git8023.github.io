import { openApiTransfer } from '@/store/mod/openApiTransfer';
import { sys } from '@/store/mod/sys';
import { StoreTools } from '@hyong8023/tool-box';

export class mod {
  /** 系统配置 */
  static readonly sys = StoreTools.namespaceX(sys);

  /** 开放接口 */
  static readonly openApiTransfer = StoreTools.namespaceX(openApiTransfer);
}

import { sys } from '@/store/mod/sys';
import { StoreTools } from '@hyong8023/tool-box';

export class mod {
  static readonly sys = StoreTools.namespaceX(sys);
}

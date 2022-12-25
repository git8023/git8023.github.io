import { Cast, StoreTools } from '@hyong8023/tool-box';

export const openApiTransfer = StoreTools.generate({
  content: Cast.anyO,
}, true, 'openApiTransfer');

import { vms } from '@/type/vms';
import { Cast, StoreTools } from '@hyong8023/tool-box';

export const sys = StoreTools.generate({
  topRefer: Cast.as<vms.Refer>(),
  toolRefer: Cast.as<vms.Refer>(),
}, true, 'sys');

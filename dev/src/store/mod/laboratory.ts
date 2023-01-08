import { vms } from '@/type/vms';
import { Cast, StoreTools } from '@hyong8023/tool-box';

export const laboratory = StoreTools.generate({
  activeRefer: Cast.nil as vms.Refer,
}, true, 'laboratory');

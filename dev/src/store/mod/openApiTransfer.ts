import { vms } from '@/type/vms';
import { Cast, StoreTools } from '@hyong8023/tool-box';

export const openApiTransfer = StoreTools.generate({
  rootHandle: Cast.nil as FileSystemDirectoryHandle,
  content: Cast.anyO,
  files: Cast.anyA as vms.FileX[],
  currentFile: Cast.nil as vms.FileX,
  extractMod: Cast.anyA as vms.ExtractMod[],
}, true, 'openApiTransfer');

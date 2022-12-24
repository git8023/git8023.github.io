import { Broadcast } from '@hyong8023/tool-box';

export class ChannelType {
  TEST = Symbol('TEST');

  /** 重新登录 */
  REDO_LOGIN = Symbol('REDO_LOGIN');

  /** 刷新设备模型缓存 */
  RELOAD_CACHED_MODEL_CONFIG = Symbol('RELOAD_CACHED_MODEL_CONFIG');

  /** 刷新缓存: 设备类型 */
  RELOAD_CACHED_EQUIPMENT_TYPES = Symbol('RELOAD_CACHED_EQUIPMENT_TYPES');

  /** 刷新缓存: 设备类型型号 */
  RELOAD_CACHED_EQUIPMENT_MODELS = Symbol('RELOAD_CACHED_EQUIPMENT_MODELS');

  /** 刷新缓存: 项目 */
  RELOAD_CACHED_PROJECTS = Symbol('RELOAD_CACHED_PROJECTS');
}

export const broadcast = new Broadcast<ChannelType>();

import { Validation } from '@hyong8023/tool-box';

export default class ComTools {
  /**
   * 校验指定属性是否有配置
   * @param prop 属性值
   * @param [emptyVal=true] 当属性值为空字符串时返回的值
   */
  static checkConfigured(
    prop: boolean,
    emptyVal = true,
  ): boolean {
    if (prop) return true;
    if (Validation.isEmpty(prop)) return emptyVal;
    return false;
  }

  /**
   * 全屏
   * @param [fullscreen=true] 进入全拼指定为true，否则指定为false
   */
  static fullscreen(fullscreen = true): Promise<void> {
    if (!document.fullscreenEnabled) return Promise.resolve();

    if (fullscreen) return document.body.requestFullscreen();

    if (document.fullscreenElement) return document.exitFullscreen();

    return Promise.resolve();
  }
}

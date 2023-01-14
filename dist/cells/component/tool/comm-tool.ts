export class CommTool {
  /**
   * 闭包执行
   * @param fn 闭包函数
   * @param [sync=true] 同步执行指定为true, 否则异步执行
   */
  static closure(fn: () => void, sync = true) {
    if (sync) {
      return fn();
    }
    setTimeout(fn);
  }
}

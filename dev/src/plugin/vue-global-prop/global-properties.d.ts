import { Config } from '@/plugins/vue-global-prop/config';
import { Pipe } from '@/plugins/vue-global-prop/pipe';
import { Vmx } from '@/plugins/vue-global-prop/vmx';
import { Broadcast, fns } from '@hyong8023/tool-box';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * 管道
     */
    pipe$: fns.Handler<any | funcs.IProducer<any>, Pipe>,

    /**
     * 配置
     */
    config$: typeof Config,

    /**
     *  全局广播
     */
    broadcast$: Broadcast,

    /**
     * vm增强
     */
    vmx$: fns.Handler<any, Vmx>,

    /** 全局上下文 */
    window$: Window,
  }
}

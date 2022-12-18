import { broadcast } from '@/plugin/vue-global-prop/broadcast';
import { Config } from '@/plugin/vue-global-prop/config';
import { Pipe } from '@/plugin/vue-global-prop/pipe';
import { Vmx } from '@/plugin/vue-global-prop/vmx';
import { App } from 'vue';

export default {
  install(app: App) {
    app.config.globalProperties.window$ = window;
    app.config.globalProperties.pipe$ = Pipe.of;
    app.config.globalProperties.config$ = Config;
    app.config.globalProperties.broadcast$ = broadcast;
    app.config.globalProperties.vmx$ = Vmx.of;
  },
};

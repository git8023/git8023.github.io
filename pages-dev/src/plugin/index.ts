import axiosServe from '@/net-serve/axios-serve';
import elementPlus from '@/plugin/elementPlus';
import recursionComponents from '@/plugin/recursion-components';
import vueGlobalProp from '@/plugin/vue-global-prop';
import { DataPool } from '@hyong8023/tool-box';
import { App } from 'vue';
import '@hyong8023/tool-box/dist/style.css';

export default {
  install(app: App) {
    app.use(elementPlus).use(vueGlobalProp).use(recursionComponents);

    DataPool.set('AXIOS_SERVICE', axiosServe);
  },
};

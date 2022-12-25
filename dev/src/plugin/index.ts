import axiosServe from '@/net-serve/axios-serve';
import elementPlus from '@/plugin/elementPlus';
import recursionComponents from '@/plugin/recursion-components';
import vueGlobalProp from '@/plugin/vue-global-prop';
import { DataPool } from '@hyong8023/tool-box';
import highlight from '@/plugin/directive/high-light';
import { App } from 'vue';
import '@hyong8023/tool-box/dist/style.css';
import '@/style/global.scss';

export default {
  install(app: App) {
    app.use(elementPlus).use(vueGlobalProp).use(recursionComponents).use(highlight);

    DataPool.set('AXIOS_SERVICE', axiosServe);
  },
};

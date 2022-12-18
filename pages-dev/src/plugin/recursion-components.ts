import MenuRender from '@/components/menu/MenuRender.vue';
import { App } from 'vue';

export default {
  install(app: App) {
    app.component('MenuRender', MenuRender);
    // customElements.define('MenuRender', MenuRender, {});
  },
};

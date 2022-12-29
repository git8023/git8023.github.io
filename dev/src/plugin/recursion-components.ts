import FileTreeNode from '@/views/online-tools/api-transfer/FileTreeNode.vue';
import { App } from 'vue';

export default {
  install(app: App) {
    // 全局组件注册
    app.component('FileTreeNode', FileTreeNode);
  },
};

<template>
  <div class="root-file-tree-node">
    <div class="dc-flex-row dc-flex-center item pointer padding" :data-origin="node"
         @click="onOpen">
      <SvgIcon :type=" node.handle.kind === 'directory' ? 'opened-folder' : 'File'" />
      <span class="dc-flex-other_only">{{ node.handle.name }}</span>
    </div>

    <template v-if="openChildren">
      <Component v-for="item in node.children" :key="item.id" is="FileTreeNode" :node="item" />
    </template>
  </div>
</template>

<script lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue';
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { fns } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
  components: { SvgIcon },
  emits: [],
})
export default class FileTreeNode extends Vue {
  @Prop({ required: true }) node!: vms.FileTreeNode;

  @mod.openApiTransfer.Action('currentFile') currentFile!: fns.Consume<vms.FileX>;

  openChildren = false;

  mounted() {
  }

  onOpen() {
    if (this.node.handle.kind === 'directory') {
      this.openChildren = !this.openChildren;
    } else {
      this.currentFile({
        id: this.node.id,
        handle: this.node.handle,
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/style/variable.scss";
.root-file-tree-node {background:transparent;
  * {transition:all .1s;}
  .item {
    &:hover {color:$color-linker__hover;}
  }
  :deep {
    .root-file-tree-node { margin-left:1.5rem;}
  }
}
</style>

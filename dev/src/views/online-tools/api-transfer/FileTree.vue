<template>
  <div class="root-file-tree dc-full-height">
    <Scroller class="dc-full-height">
      <FileTreeNode v-for="item in fileTree" :key="item.id" :node="item" />
    </Scroller>
  </div>
</template>

<script lang="ts">
import Scroller from '@/components/scroller/Scroller.vue';
import { vms } from '@/type/vms';
import FileTreeNode from '@/views/online-tools/api-transfer/FileTreeNode.vue';
import { Strings } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
  components: { Scroller, FileTreeNode },
  emits: [],
})
export default class FileTree extends Vue {
  @Prop({ required: true }) root!: vms.DirHandle;

  fileTree: vms.FileTreeNode[] = [];

  @Watch('root')
  watch$root() {
    this.fileTree.length = 0;
    if (this.root) {
      this.readFiles(this.root, this.fileTree);
    }
  }

  async readFiles(dirHandle: vms.DirHandle, nodes: vms.FileTreeNode[]) {
    const tmpNodes: vms.FileTreeNode[] = [];
    nodes.push({
      id: Strings.guid(),
      handle: dirHandle,
      children: tmpNodes,
    });
    for await (const fh of dirHandle.values()) {
      if (fh.kind === 'file') {
        tmpNodes.push({
          id: Strings.guid(),
          children: [],
          handle: fh as any,
        });
      }

      if (fh.kind === 'directory') {
        await this.readFiles(fh as any, tmpNodes);
      }
    }
  }

  // 重新渲染
  rerender() {
    this.watch$root();
  }
}
</script>

<style scoped lang="scss">
.root-file-tree {background:transparent; width:300px;}
</style>

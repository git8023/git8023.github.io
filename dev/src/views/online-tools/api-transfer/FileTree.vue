<template>
  <div class="root-file-tree">
    <div v-for="item in fileTree" :key="item.id">
      {{ item.handle.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Strings } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

// eslint-disable-next-line no-undef
type DirHandle = FileSystemDirectoryHandle & {
  // eslint-disable-next-line no-undef
  values(): (FileSystemFileHandle | FileSystemDirectoryHandle)[]
}

type FileTreeNode = {
  id: string,
  // eslint-disable-next-line no-undef
  handle: FileSystemFileHandle | DirHandle,
  children: FileTreeNode[]
}

@Options({
  components: {},
  emits: [],
})
export default class FileTree extends Vue {
  // eslint-disable-next-line no-undef
  @Prop({ required: true }) root!: DirHandle;

  fileTree: FileTreeNode[] = [];

  @Watch('root')
  watch$root() {
    if (this.root) {
      this.readFiles();
    }
  }

  async readFiles() {
    let children: FileTreeNode[] = [];
    this.fileTree.push({
      id: Strings.guid(),
      handle: this.root,
      children,
    });
    for await (const fh of this.root.values()) {
      let tmp: FileTreeNode[] = [];
      children.push({
        id: Strings.guid(),
        children: tmp = [],
        handle: fh as any,
      });
      if (fh.kind === 'directory') {
        children = tmp;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.root-file-tree {background:transparent; width:300px;}
</style>

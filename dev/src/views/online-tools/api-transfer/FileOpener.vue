<template>
  <div class="root-file-opener dc-full-height dc-flex-col">

    <Box class="files-opened-scroller">
      <template #default="{rect}">
        <el-tabs v-model="openedFile" type="card" :style="{width:rect.width+'px'}"
                 @tab-change="onTabChange($event)" @tab-remove="onTabRemove($event)"
                 :closable="filePanelClosable">
          <el-tab-pane v-for="item in files" :key="item.id"
                       :label="item.handle.name + '-' + filePanelClosable"
                       :name="item.id" />
        </el-tabs>
      </template>
    </Box>

    <div class="dc-flex-1">
      <BoxCode v-model:code="current.content" />
    </div>

  </div>
</template>

<script lang="ts">
import Box from '@/components/box/Box.vue';
import BoxCode from '@/components/box/BoxCode.vue';
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { Arrays, Cast, fns } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

@Options({
  components: { Box, BoxCode },
  emits: [],
})
export default class FileOpener extends Vue {
  @mod.openApiTransfer.Getter('currentFile') currentFile!: vms.FileX;
  @mod.openApiTransfer.Action('currentFile') setCurrentFile!: fns.Consume<vms.FileX>;
  @mod.openApiTransfer.Action('files') setFiles!: fns.Consume<vms.FileX[]>;
  @mod.openApiTransfer.Getter('files') files!: vms.FileX[];

  openedFile = '';
  current = {
    file: Cast.nil as vms.FileX,
    content: '',
  };

  get fileMapper() {
    return Arrays.toMap(this.files, 'id');
  }

  // 当前文件索引
  get currentFileIndex() {
    return this.files.indexOf(this.currentFile);
  }

  // 文件标签是否允许关闭
  get filePanelClosable() {
    return this.files.length > 1;
  }

  @Watch('currentFile', { immediate: true })
  watch$currentFile() {
    if (!this.currentFile) {
      return;
    }

    this.openedFile = this.currentFile.id;
    if (!(this.currentFile.id in this.fileMapper)) {
      const files = [...this.files, this.currentFile];
      this.setFiles(files);
    }

    this.readFileContent();
  }

  // 读取文件内容
  async readFileContent() {
    const file = await this.currentFile.handle.getFile();
    const fr = new FileReader();
    fr.readAsText(file);
    fr.onloadend = () => {
      this.current.content = Cast.as(fr.result!);
    };
  }

  // 激活不同文件
  onTabChange(openedFile: string) {
    const file = this.fileMapper[openedFile];
    this.setCurrentFile(file);
  }

  // 关闭选项卡
  onTabRemove(fileId: string) {
    const { currentFileIndex } = this;

    let closedFileIndex!: number;
    const files = this.files.filter(({ id }, index) => {
      if (id === fileId) {
        closedFileIndex = index;
        return false;
      }
      return true;
    });

    let nextFile: vms.FileX;
    if (currentFileIndex === closedFileIndex) {
      const nextFileIndex = Math.min(files.length - 1, closedFileIndex);
      nextFile = files[nextFileIndex];
    } else {
      nextFile = this.currentFile;
    }

    this.setFiles(files);
    this.setCurrentFile(nextFile);
    this.readFileContent();
  }
}
</script>

<style scoped lang="scss">
.root-file-opener {background:transparent;
  :deep {
    .el-tabs__header {margin:0;}
  }
}
</style>

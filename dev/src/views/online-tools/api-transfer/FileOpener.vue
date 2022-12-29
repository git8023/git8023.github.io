<template>
  <div class="root-file-opener dc-full-height dc-flex-col">

    <Box class="files-opened-scroller">
      <template #default="{rect}">
        <el-tabs v-model="openedFile" type="card" closable :style="{width:rect.width+'px'}"
                 @tab-change="onTabChange($event)">
          <el-tab-pane v-for="item in files" :key="item.id" :label="item.handle.name"
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
}
</script>

<style scoped lang="scss">
.root-file-opener {background:transparent;
  :deep {
    .el-tabs__header {margin:0;}
  }
}
</style>

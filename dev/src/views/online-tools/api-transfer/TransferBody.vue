<template>
  <div class="root-transfer-body dc-flex-col padding">

    <el-form :model="model" label-position="top" inline class="padding">
      <el-form-item label="Output Directory">
        <el-input placeholder="Click to choose Directory" readonly class="pointer"
                  @click="onChooseLocalDirectory()" />
      </el-form-item>
      <el-form-item label="Same Classify Mod">
        <el-switch v-model="model.entityInOneFile" :active-value="true" active-text="One File"
                   :inactive-value="false" inactive-text="More Files" />
      </el-form-item>
      <el-form-item label="Extract Mod">
        <el-checkbox-group v-model="model.extract">
          <el-checkbox v-for="(item, key) in extractMods" :key="key" :label="key">
            {{ item.text }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="&nbsp;">
        <el-button type="primary" @click="onTransfer()">Transfer</el-button>
      </el-form-item>
    </el-form>

    <div class="dc-flex-1 height__zero border-top dc-flex-row padding-bottom padding-top">
      <FileTree :root="handles.rootDir" class="border" />
      <FileOpener class="dc-flex-other_only dc-gap-left-2x border" />
    </div>

  </div>
</template>

<script lang="ts">
import { mod } from '@/store/mod';
import { OpenApis } from '@/tools/open-api/OpenApis';
import { openApi } from '@/type/open-api';
import FileOpener from '@/views/online-tools/api-transfer/FileOpener.vue';
import FileTree from '@/views/online-tools/api-transfer/FileTree.vue';
import { Cast, fns } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { FileOpener, FileTree },
  emits: [],
})
export default class TransferBody extends Vue {
  @mod.openApiTransfer.Action('rootHandle') setRootHandle!: fns.Consume<FileSystemDirectoryHandle>;
  @mod.openApiTransfer.Getter('content') apiDocRoot!: openApi.Root;

  extractMods = {
    entities: { text: 'Entity' },
    enums: { text: 'Enumeration' },
    netApis: { text: 'Net Apis' },
  };
  model = {
    entityInOneFile: true,
    extract: Object.keys(this.extractMods),
  };

  handles = {
    // eslint-disable-next-line no-undef
    rootDir: Cast.nil as FileSystemDirectoryHandle,
  };

  async onChooseLocalDirectory() {
    this.handles.rootDir = await window.showDirectoryPicker();
    this.setRootHandle(this.handles.rootDir);
  }

  // 开始转换
  async onTransfer() {
    const result = OpenApis.transfer(this.apiDocRoot);

    // const entityContent = result.entities();
    // const fileHandle = await this.handles.rootDir.getFileHandle('entity.ts', { create: true });
    // const wfs = await fileHandle.createWritable();
    // await wfs.write(entityContent);
    // await wfs.close();
  }
}
</script>

<style scoped lang="scss">
.root-transfer-body {background:transparent;}
</style>

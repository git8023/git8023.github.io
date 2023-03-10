<template>
  <div class="root-transfer-body dc-flex-col padding">

    <el-form :model="model" label-position="top" inline class="padding">
      <el-form-item label="Output Directory" :rules="{required:true}">
        <el-input :model-value="outputDirName" placeholder="Click to choose Directory" readonly
                  class="pointer"
                  @click="onChooseOutputDirectory()" />
      </el-form-item>
      <el-form-item label="Same Classify Mod">
        <el-switch v-model="model.entityInOneFile" :active-value="true" active-text="One File"
                   :inactive-value="false" inactive-text="More Files" />
      </el-form-item>
      <el-form-item label="Extract Mod">
        <el-checkbox-group v-model="model.extract">
          <el-checkbox v-for="(item, key) in extractMods" :key="key" :label="key"
                       @change="resetExtractMods">
            {{ item.text }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="&nbsp;">
        <el-button type="primary" @click="onTransfer()" :loading="loading"
                   :disabled="disableTransferBtn">
          Transfer
        </el-button>
      </el-form-item>
    </el-form>

    <div class="dc-flex-1 height__zero border-top dc-flex-row padding-bottom padding-top">
      <FileTree :root="handles.rootDir" class="border" ref="fileTreeRef" />
      <FileOpener class="dc-flex-other_only dc-gap-left-2x border" />
    </div>

  </div>
</template>

<script lang="ts">
import { mod } from '@/store/mod';
import { OpenApis } from '@/tools/open-api/OpenApis';
import { openApi } from '@/type/open-api';
import { vms } from '@/type/vms';
import FileOpener from '@/views/online-tools/api-transfer/FileOpener.vue';
import FileTree from '@/views/online-tools/api-transfer/FileTree.vue';
import { Cast, fns, Jsons, Logs, Validation } from '@hyong8023/tool-box';
import { ElMessage } from 'element-plus';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { FileOpener, FileTree },
  emits: [],
})
export default class TransferBody extends Vue {
  @mod.openApiTransfer.Action('rootHandle') setRootHandle!: fns.Consume<FileSystemDirectoryHandle>;
  @mod.openApiTransfer.Getter('content') apiDocRoot!: openApi.Root;
  @mod.openApiTransfer.Action('extractMod') extractMod!: fns.Consume<vms.ExtractMod[]>;

  extractMods = {
    entities: { text: 'Entity' },
    netApis: { text: 'Net Apis' },
  };
  model = {
    entityInOneFile: true,
    extract: Object.keys(this.extractMods) as vms.ExtractMod[],
  };
  handles = {
    // eslint-disable-next-line no-undef
    rootDir: Cast.nil as FileSystemDirectoryHandle,
  };
  loading = false;

  // ???????????????
  get outputDirName() {
    return Jsons.get(this.handles.rootDir, 'name') as string;
  }

  // ??????????????????
  get disableTransferBtn() {
    return Validation.isEmpty(this.apiDocRoot) || !this.outputDirName;
  }

  // ???????????????
  get fileTreeRef() {
    return this.$refs.fileTreeRef as FileTree;
  }

  // ??????????????????
  onChooseOutputDirectory() {
    window.showDirectoryPicker()
          .then(async (handle) => {
            let isEmpty = true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for await (const _ of handle.entries()) {
              isEmpty = false;
            }
            if (!isEmpty) {
              ElMessage.error('Only support an empty directory');
              // return this.onChooseOutputDirectory();
              // return;
            }

            this.handles.rootDir = handle;
            this.setRootHandle(this.handles.rootDir);
          })
          .catch((e) => {
            const msg = 'No output directory selected';
            ElMessage.info(msg);
            Logs.debug(`${msg}, Error:`, e);
          });
  }

  // ????????????
  async onTransfer() {
    this.loading = true;
    const result = OpenApis.transfer(this.apiDocRoot);

    // ??????????????????
    if (this.model.extract.includes('entities')) {
      const entityContent = result.entities();
      const fileHandle = await this.handles.rootDir.getFileHandle('entity.ts', { create: true });
      await this.writeFile(fileHandle, entityContent);
    }

    // ??????????????????
    if (this.model.extract.includes('netApis')) {
      const netServeDir = await this.handles.rootDir.getDirectoryHandle(
        'net-serve',
        { create: true },
      );
      await Jsons.foreach(result.apis, async ({ item: content, index: filename }) => {
        const fileHandle = await netServeDir.getFileHandle(`${filename}.ts`, { create: true });
        await this.writeFile(fileHandle, content);
      }, false);
    }
    ElMessage.success('????????????');
    this.loading = false;

    this.fileTreeRef.rerender();
  }

  // ????????????
  async writeFile(fh: FileSystemFileHandle, content: string | BufferSource | Blob) {
    const wfs = await fh.createWritable();
    await wfs.write(content);
    await wfs.close();
  }

  // ????????????????????????
  resetExtractMods() {
    this.extractMod(this.model.extract);
  }
}
</script>

<style scoped lang="scss">
.root-transfer-body {background:transparent;}
</style>

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
        <el-button type="primary">Transfer</el-button>
      </el-form-item>
    </el-form>

    <div class="dc-flex-1 height__zero border-top dc-flex-row">
      <FileTree :root="handles.rootDir" class="border" />
      <div class="dc-flex-other_only dc-gap-left-2x border">111</div>
    </div>

  </div>
</template>

<script lang="ts">
import FileTree from '@/views/online-tools/api-transfer/FileTree.vue';
import { Cast } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { FileTree },
  emits: [],
})
export default class TransferBody extends Vue {
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
  }
}
</script>

<style scoped lang="scss">
.root-transfer-body {background:transparent;}
</style>

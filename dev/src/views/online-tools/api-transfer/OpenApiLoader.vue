<template>
  <div class="root dc-full-height dc-flex-col border-left">

    <!--URL-->
    <div class="dc-box-padding padding-bottom__zero">
      <HeaderRow text="API URL">
        <el-button type="primary" @click="onFetch()">Fetch</el-button>
      </HeaderRow>
      <el-input v-model="serveUrl" type="textarea" :rows="5" :autosize="{minRows:5, maxRows:5}"
                class="dc-gap-top" placeholder="Open API JSON url address" resize="none" />
    </div>

    <!--Content-->
    <HeaderRow class="dc-box-padding" text="API JSON Content" />
    <div class="dc-flex-other_only height__zero border-top padding">
      <Box class="dc-full-height">
        <template #default="{rect}">
          <Codemirror2 v-model="code"
                       :style="{height:rect.height+'px', width:rect.width-10+'px'}"
                       readonly />
        </template>
      </Box>
    </div>

  </div>
</template>

<script lang="ts">
import Box from '@/components/box/Box.vue';
import CodeHL from '@/components/code/CodeHL.vue';
import Codemirror2 from '@/components/code/Codemirror2.vue';
import HeaderRow from '@/components/header/HeaderRow.vue';
import { mod } from '@/store/mod';
import { fns } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

@Options({
  components: { Box, Codemirror2, HeaderRow, CodeHL },
  emits: [],
})
export default class OpenApiLoader extends Vue {
  @mod.openApiTransfer.Action('content') setContent!: fns.Consume<any>;

  code = 'No Data';
  serveUrl = 'http://127.0.0.1:6500/DATA_COLLECTION_OpenAPI.json';

  @Watch('code')
  watch$code() {
    this.setContent(JSON.parse(this.code));
  }

  onFetch() {
    fetch(this.serveUrl).then((data) => data.json()).then((data) => {
      this.code = JSON.stringify(data, null, 4);
    });
  }
}
</script>

<style scoped lang="scss">
.root {background:transparent; width:300px;}
</style>

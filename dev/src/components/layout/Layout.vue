<template>
  <div class="root dc-full-window">

    <div class="bounds dc-flex-col dc-full-height dc-margin-center">
      <TopMenu />

      <div class="dc-flex-1 height__zero">
        <ReferView v-if="referType === 'REFER'" :refer="refer" />
        <router-view v-else />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import TopMenu from '@/components/layout/TopMenu.vue';
import ReferView from '@/components/refer-view/ReferView.vue';
import Scroller from '@/components/scroller/Scroller.vue';
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { Jsons } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { ReferView, Scroller, TopMenu },
  emits: [],
})
export default class Layout extends Vue {
  @mod.sys.Getter('topRefer') refer!: vms.OuterRefer;

  get referType() {
    return Jsons.get(this.refer, 'type');
  }
}
</script>

<style scoped lang="scss">
.root {background:transparent;
  // .bounds {width:1200px;}
}
</style>

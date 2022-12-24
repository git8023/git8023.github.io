<template>
  <div class="root dc-full-window">

    <div class="bounds dc-flex-col dc-full-height dc-margin-center">
      <TopMenu />

      <div class="dc-flex-1 height__zero">
        <ReferView v-if="refer.type === 'REFER'" />
        <!--<Scroller v-else class="dc-full-height">-->
        <router-view v-else />
        <!--</Scroller>-->
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
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { ReferView, Scroller, TopMenu },
  emits: [],
})
export default class Layout extends Vue {
  @mod.sys.Getter('topRefer') refer!: vms.Refer;
}
</script>

<style scoped lang="scss">
.root {background:transparent;
  // .bounds {width:1200px;}
}
</style>

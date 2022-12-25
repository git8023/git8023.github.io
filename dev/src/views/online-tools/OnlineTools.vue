<template>
  <div class="root dc-flex-row dc-full">

    <div class="refer-bound">
      <Linker v-for="refer in menus" :key="pipe$(refer).vueKey" :refer="refer" class="dc-block"
              :class="{'active-refer':refer.label===pipe$(activeToolRefer).seek('label').value}"
              @click="onLikerClick(refer)" blocked sub-link />
    </div>

    <div class="dc-flex-1 border-left">
      <router-view />
    </div>

  </div>
</template>

<script lang="ts">
import Linker from '@/components/linker/Linker.vue';
import Scroller from '@/components/scroller/Scroller.vue';
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { Cast, fns } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { Scroller, Linker },
  emits: [],
})
export default class OnlineTools extends Vue {
  @mod.sys.Action('toolRefer') setActiveToolRefer!: fns.Consume<vms.InnerRefer>;
  @mod.sys.Getter('toolRefer') activeToolRefer!: vms.Refer;

  menus: vms.InnerRefer[] = [
    { type: 'INNER', path: 'online-tools/', label: '接口转换' },
  ];

  unmounted() {
    this.setActiveToolRefer(Cast.nil);
  }

  onLikerClick(refer: vms.InnerRefer) {
    this.setActiveToolRefer(refer);
    if (refer.type === 'INNER') {
      this.$router.push({ path: refer.path });
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/style/variable.scss";
.root {background:transparent;
  .refer-bound {width:200px;}
  :deep {
    .root-linker {border-bottom:$border;}
  }
}
</style>

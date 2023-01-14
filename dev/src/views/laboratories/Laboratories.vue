<template>
  <div class="root-laboratory dc-full dc-flex-row">

    <div class="left-nav-bounds">
      <Linker v-for="refer in menus" :key="pipe$(refer).vueKey" :refer="refer" class="dc-block"
              :class="{'active-refer':refer.label===pipe$(activeRefer).seek('label').value}"
              @click="onLikerClick(refer)" blocked sub-link />
    </div>

    <div class="dc-flex-1 border-left">
      <ReferView v-if="referType === 'REFER'" :refer="activeRefer" />
      <router-view v-else />
    </div>

  </div>
</template>

<script lang="ts">
import Linker from '@/components/linker/Linker.vue';
import ReferView from '@/components/refer-view/ReferView.vue';
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { Arrays, fns, Jsons } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { ReferView, Linker },
  emits: [],
})
export default class Laboratories extends Vue {
  @mod.laboratory.Action('activeRefer') activeRefer$!: fns.Consume<vms.Refer>;
  @mod.laboratory.Getter('activeRefer') activeRefer!: vms.Refer;

  menus: vms.OuterRefer[] = [
    { label: 'Cells', type: 'REFER', href: './cells/index.html' },
  ];

  get referType() {
    return Jsons.get(this.activeRefer, 'type');
  }

  // 菜单映射
  get menuMapper() {
    return Arrays.toMap(this.menus, 'href');
  }

  // 组件挂载
  mounted() {
    this.onLikerClick(this.menus[0]);
  }

  // 点击链接
  onLikerClick(menu: vms.OuterRefer) {
    this.activeRefer$(menu);
  }
}
</script>

<style scoped lang="scss">
.root-laboratory {background:transparent;}
</style>

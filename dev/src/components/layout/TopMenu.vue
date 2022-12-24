<template>
  <div class="root-top-menu">
    <Linker v-for="refer in refers" :key="pipe$(refer).vueKey" :refer="refer"
            :class="{'active-refer':refer===activeTopRefer}" @click="onLikerClick(refer)" />
  </div>
</template>

<script lang="ts">
import Linker from '@/components/linker/Linker.vue';
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { fns } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { Linker },
  emits: [],
})
export default class TopMenu extends Vue {
  @mod.sys.Getter('topRefer') activeTopRefer!: vms.Refer;
  @mod.sys.Action('topRefer') setActiveTopRefer!: fns.Consume<vms.Refer>;

  refers: vms.Refer[] = [
    {
      label: 'ToolBox',
      type: 'REFER',
      href: './tool-box/doc/index.html',
    },
    {
      type: 'INNER',
      label: '在线工具',
      path: 'online-tools',
    },
  ];

  onLikerClick(refer: vms.Refer) {
    this.setActiveTopRefer(refer);
    if (refer.type === 'INNER') {
      this.$router.push({ path: refer.path });
    }
  }
}
</script>

<style scoped lang="scss">
.root-top-menu {background:transparent; box-shadow:0 0 10px rgba(#000, .2); z-index:1;}
</style>

<template>
  <!--一级菜单-->
  <el-menu-item v-if="!menu.children.length" :index="menu.route">{{ menu.text }}</el-menu-item>

  <!--二级菜单-->
  <el-sub-menu v-else :index="menu.route">
    <template #title>{{ menu.text }}</template>

    <template v-for="sm in menu.children" :key="sm.route">
      <MenuRender :menu="sm" />
    </template>
  </el-sub-menu>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { vms } from '@/type/vms';

@Options({
  components: {},
  emits: [],
})
export default class MenuRender extends Vue {
  @Prop({ required: true }) menu!: vms.Menu;
}
</script>

<style scoped lang="scss">
.root {background:transparent;}
</style>

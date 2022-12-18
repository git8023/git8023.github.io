<template>
  <div class="root dc-full-window dc-flex-col">

    <LayoutHeader />

    <div class="dc-flex-1">
      <iframe v-if="referLink" :src="referLink.href" :title="referLink.title"
              class="dc-full dc-block" />
      <router-view v-else />
    </div>

  </div>
</template>

<script lang="ts">
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { LayoutHeader },
  emits: [],
})
export default class Layout extends Vue {
  @mod.sys.Getter('referLink') referLink!: vms.ReferLink;
}
</script>

<style scoped lang="scss">
.root {background:transparent;}
</style>

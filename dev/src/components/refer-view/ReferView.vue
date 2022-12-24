<template>
  <div class="root-refer-view dc-full-height">
    <iframe :src="refer.href" :title="refer.label" class="dc-full dc-block" />
  </div>
</template>

<script lang="ts">
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
  emits: [],
})
export default class ReferView extends Vue {
  @mod.sys.Getter('topRefer') refer!: vms.OuterRefer;
}
</script>

<style scoped lang="scss">
.root-refer-view {background:transparent;
  iframe {border:0;}
}
</style>

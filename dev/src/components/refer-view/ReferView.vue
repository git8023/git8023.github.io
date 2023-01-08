<template>
  <div class="root-refer-view dc-full-height">
    <iframe :src="refer.href" :title="refer.label" class="dc-full dc-block" />
  </div>
</template>

<script lang="ts">
import { vms } from '@/type/vms';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
  components: {},
  emits: [],
})
export default class ReferView extends Vue {
  @Prop({ required: true }) refer!: vms.OuterRefer;
}
</script>

<style scoped lang="scss">
.root-refer-view {background:transparent;
  iframe {border:0;}
}
</style>

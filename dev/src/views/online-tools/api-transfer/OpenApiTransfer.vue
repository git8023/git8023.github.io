<template>
  <div class="root dc-full-height dc-flex-row">

    <TransferBody class="dc-flex-other_only" />

    <OpenApiLoader />

  </div>
</template>

<script lang="ts">
import OpenApiLoader from '@/views/online-tools/api-transfer/OpenApiLoader.vue';
import TransferBody from '@/views/online-tools/api-transfer/TransferBody.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { TransferBody, OpenApiLoader },
  emits: [],
})
export default class OpenApiTransfer extends Vue {
}
</script>

<style scoped lang="scss">
.root {background:transparent;}
</style>

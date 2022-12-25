<template>
  <div class="root-box">
    <slot :rect="rect" />
  </div>
</template>

<script lang="ts">
import { Cast } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
  emits: [],
})
export default class Box extends Vue {
  rect: DOMRect = Cast.anyO;

  mounted() {
    const rect = (this.$el as HTMLElement).getBoundingClientRect();
    this.rect = rect;
  }
}
</script>

<style scoped lang="scss">
.root-box {background:transparent;}
</style>

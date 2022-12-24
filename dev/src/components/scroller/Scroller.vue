<template>
  <div class="root-scroller" :class="{'dc-full-height':fullInner}">
    <el-scrollbar>
      <div>
        <slot />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import ComTools from '@/tools/com-tools';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
  components: {},
  emits: [],
})
export default class Scroller extends Vue {
  @Prop({ default: true }) full!: boolean;

  get fullInner() {
    return ComTools.checkConfigured(this.full);
  }
}
</script>

<style scoped lang="scss">
.root-scroller {background:initial;}
</style>

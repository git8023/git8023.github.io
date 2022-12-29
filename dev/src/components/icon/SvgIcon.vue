<template>
  <embed :src="srcInner" class="root-svg-icon">
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
  components: {},
  emits: [],
})
export default class SvgIcon extends Vue {
  @Prop() src!: any;
  @Prop() type!: 'opened-folder' | 'File';

  get srcInner() {
    if (this.src) {
      return this.src;
    }

    return require(`@/assets/svg/${this.type}.svg`);
  }
}
</script>

<style scoped lang="scss">
.root-svg-icon {width:24px;}
</style>

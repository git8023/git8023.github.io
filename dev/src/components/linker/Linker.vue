<template>
  <div class="root-linker" :class="styleClasses">
    {{ refer.label }}
    <slot />
  </div>
</template>

<script lang="ts">
import ComTools from '@/tools/com-tools';
import { vms } from '@/type/vms';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
  components: {},
  emits: [],
})
export default class Linker extends Vue {
  @Prop({ required: true }) refer!: vms.Refer;
  @Prop({ default: false }) blocked!: boolean;
  @Prop({ default: false }) subLink!: boolean;

  styleClasses: string[] = [];

  get classes() {
    return this.styleClasses.join(' ');
  }

  @Watch('blocked', { immediate: true })
  watch$blocked() {
    this.styleClasses.push(
      ComTools.checkConfigured(this.blocked) ? 'dc-block' : 'dc-inline-block',
    );
  }

  @Watch('subLink', { immediate: true })
  watch$subLink() {
    this.styleClasses.push(
      ComTools.checkConfigured(this.subLink) ? 'sub-link' : '',
    );
  }
}
</script>

<style scoped lang="scss">
.root-linker {background:transparent; padding:1rem; cursor:pointer; font-size:1.25rem;
  &.sub-link {font-size:1rem;}
}
</style>

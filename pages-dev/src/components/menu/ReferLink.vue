<template>
  <div class="root-refer-link dc-inline-block" @click="onClick">
    <slot />
  </div>
</template>

<script lang="ts">
import { mod } from '@/store/mod';
import { vms } from '@/type/vms';
import { fns, Logs } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
  components: {},
  emits: [],
})
export default class ReferLink extends Vue {
  @mod.sys.Action('referLink') setReferLink!: fns.Consume<vms.ReferLink>;

  @Prop({ required: true }) href!: string;
  @Prop() title!: string;

  get pageTitle() {
    return this.title ?? (this.$el as HTMLElement).innerText.trim();
  }

  onClick() {
    Logs.debug('onClick', this.href);
    this.setReferLink({ href: this.href, title: this.pageTitle });
  }
}
</script>

<style scoped lang="scss">
.root-refer-link {background:transparent;}
</style>

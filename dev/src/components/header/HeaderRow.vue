<template>
  <div class="root-header-row dc-flex-row dc-flex-center">
    <span class="dc-flex-1">{{ text }}</span>
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
  components: {},
  emits: [],
})
export default class HeaderRow extends Vue {
  @Prop({ required: true }) text!: string;
}
</script>

<style scoped lang="scss">
.root-header-row {background:transparent;}
</style>

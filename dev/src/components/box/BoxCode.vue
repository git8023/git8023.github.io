<template>
  <Box class="dc-full-height">
    <template #default="{rect}">
      <Codemirror2 v-model="codeInner" :readonly="readonlyInner"
                   :style="{height:rect.height+'px', width:rect.width-10+'px'}" />
    </template>
  </Box>
</template>

<script lang="ts">
import Box from '@/components/box/Box.vue';
import Codemirror2 from '@/components/code/Codemirror2.vue';
import ComTools from '@/tools/com-tools';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
  components: { Box, Codemirror2 },
  emits: ['update:code'],
})
export default class BoxCode extends Vue {
  @Prop() code!: string;
  @Prop({ default: true }) readonly!: boolean;

  codeInner = '';

  get readonlyInner() {
    return ComTools.checkConfigured(this.readonly);
  }

  @Watch('code', { immediate: true })
  watch$code() {
    this.codeInner = this.code;
  }

  @Watch('codeInner')
  watch$codeInner() {
    this.$emit('update:code', this.codeInner);
  }
}
</script>

<style scoped lang="scss">
.root {background:transparent;}
</style>

<template>
  <el-form label-position="top" :model="modelValue">
    <slot />
  </el-form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Model } from 'vue-property-decorator';

@Options({
  components: {},
  emits: [],
})
export default class TransferForm extends Vue {
  @Model() modelValue!: object;
}
</script>

<style scoped lang="scss">
.root {background:transparent;}
</style>

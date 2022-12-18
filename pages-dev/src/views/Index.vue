<template>
  <div class="root">
    Index is working.
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
  emits: [],
})
export default class Index extends Vue {
}
</script>

<style scoped lang="scss">
.root {background:transparent;}
</style>

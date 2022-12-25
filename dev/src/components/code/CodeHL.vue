<template>
  <div class="code-root" v-high-light>
    <div class="opts">
      <div class="btn-bounds dc-text-right">
        <el-button link type="primary" @click="onCopy">复制代码</el-button>
      </div>
    </div>
    <div ref="codeRef">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Documents } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';

/**
 * 代码高亮
 * @example
 * <CodeHL v-if="code">
 *   < pre><code>{{ code }}</code></pre>
 * </CodeHL>
 */
@Options({
  components: {},
  emits: [],
})
export default class CodeHL extends Vue {
  get codeRef() {
    return this.$refs.codeRef as HTMLElement;
  }

  onCopy() {
    Documents.copyText(this.codeRef.textContent!);
  }
}
</script>

<style scoped lang="scss">
.code-root { position:relative;
  .opts {position:absolute; top:0; left:0; width:100%; visibility:hidden;}
  &:hover {
    .opts {visibility:visible;}
  }
  :deep {
    .hljs-title {font-weight:normal; color:#a6e22e;}
  }
}
</style>

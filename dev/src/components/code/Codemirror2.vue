<template>
  <div class="root-codemirror">
    <div class="opts">
      <div class="btn-bounds dc-text-right">
        <el-button link type="primary" @click="onFmt">格式化</el-button>
        <el-button link type="primary" @click="onCopy">复制代码</el-button>
      </div>
    </div>
    <Codemirror v-if="ready" v-model="code" :extensions="extensions" :disabled="readonlyInner"
                :style="style" />
  </div>
</template>

<script lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { Extension } from '@codemirror/state';
import { Cast, Documents } from '@hyong8023/tool-box';
import { Options, Vue } from 'vue-class-component';
import { Codemirror } from 'vue-codemirror';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
  components: { Codemirror },
  emits: ['update:modelValue'],
})
export default class Codemirror2 extends Vue {
  @Prop() modelValue!: string;
  @Prop() readonly!: boolean;
  @Prop() style!: object;
  @Prop({ default: [javascript()] }) extension!: Extension;

  code = '';
  ready = false;

  get readonlyInner() {
    return this.readonly || `${this.readonly}`.length === 0;
  }

  get extensions() {
    return [...Cast.as<any>(this.extension)];
  }

  @Watch('modelValue', { immediate: true })
  watch$modelValue() {
    this.code = this.modelValue;
  }

  @Watch('code', { immediate: true })
  watch$code() {
    this.$emit('update:modelValue', this.code);
  }

  mounted() {
    this.ready = true;
  }

  // 格式化
  onFmt() {
    this.code = this.code.replaceAll('\r\n', '\n').replaceAll(/(\n{2,})/g, '\n\n');
    // Codemirror.extendMode("javascript", {
    //   commentStart: "/*",
    //   commentEnd: "*/",
    //   // FIXME semicolons inside of for
    //   newlineAfterToken: function (
    //       type: any,
    //       content: string,
    //       textAfter: any,
    //       state: any
    //   ) {
    //     if (this.jsonMode) {
    //       return /^[[,{]$/.test(content) || /^}/.test(textAfter);
    //     } else {
    //       if (content == ";" && state.lexical && state.lexical.type == ")") return false;
    //       return /^[;{}]$/.test(content) && !/^;/.test(textAfter);
    //     }
    //   }
    // });
  }

  // 复制代码
  onCopy() {
    Documents.copyText(this.code);
  }
}
</script>

<style scoped lang="scss">
.root-codemirror {position:relative;
  .opts {position:absolute; top:0; left:0; width:100%; visibility:hidden; z-index:9999;}
  &:hover {
    .opts {visibility:visible;}
  }
}
</style>

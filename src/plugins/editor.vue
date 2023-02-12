<template>
  <div class="monaco-container">
    <div ref="container" class="monaco-editor" style="height: 30em"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
export default {
  name: 'editMain',
  data: () => ({
    dialog: false,
    props: {
      current: {
        type: Number,
        default: 0
      },
      // 编辑器语言（代码语言）
      language: {
        type: String,
        default: 'javascript'
      },
      // 编辑器中呈现的内容
      codes: {
        type: String,
        default: function () {
          return ''
        }
      },
      readOnly: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      // 主要配置
      editorOptions: {
        type: Object,
        default: function () {
          return {
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: this.readOnly, // 只读
            cursorStyle: 'line', // 光标样式
            automaticLayout: false, // 自动布局
            glyphMargin: true, // 字形边缘
            useTabStops: false,
            fontSize: 28, // 字体大小
            autoIndent: false // 自动布局
          }
        }
      },
    },
  }),
  mounted() {
    this.monacoEditor = monaco.editor.create(this.$refs.container, {
      value: this.$attrs.codes,
      language: this.$attrs.language,
      theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark
      editorOptions: this.editorOptions
    })
    this.monacoEditor.onDidChangeModelContent((event) => {
      let changeContent = this.monacoEditor.getValue()
      this.$emit('update:contentBody', changeContent)
    })
  },
  watch: {
    "$attrs.current": function(){
      this.monacoEditor.setValue(this.$attrs.codes)
      monaco.editor.setModelLanguage(this.monacoEditor.getModel(), this.$attrs.language)
    }
  },
}
</script>
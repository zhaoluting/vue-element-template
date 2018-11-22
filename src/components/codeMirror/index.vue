<template>
  <codemirror ref="codeMirror" :value="code" :options="codeOptions" @input="onCodeChange" />
</template>
<script>

// 引入核心配置包
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

// 根据设置的主题，引入相应的主题包，设置option中theme为对应主题
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/monokai.css'

// 设置光标所在行高亮
import 'codemirror/addon/selection/active-line.js'

// 自动提示
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/hint/xml-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'

// 高亮 常用语言包
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/clike/clike.js'

// 代码折叠功能
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/brace-fold.js'
// import 'codemirror/addon/fold/comment-fold.js'
// import 'codemirror/addon/fold/foldcode.js'
// import 'codemirror/addon/fold/foldgutter.js'
// import 'codemirror/addon/fold/indent-fold.js'
// import 'codemirror/addon/fold/markdown-fold.js'
// import 'codemirror/addon/fold/xml-fold.js'

// 全屏模式
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen.js'

export default {
  name: 'CodeMirror',
  components: {
    codemirror
  },
  props: {
    // 代码
    code: {
      type: String,
      default: ''
    },
    // 主题（需要在顶部引入主题文件）
    theme: {
      type: String,
      default: 'monokai'
    },
    // tab字符的宽度
    tabSize: {
      type: Number,
      default: 2
    },
    // 模式（目前支持:text/html、text/javascript、text/css、text/x-vue、text/x-mysql、text/x-java）
    mode: {
      type: String,
      default: 'text/x-mysql'
    },
    // 当前行背景是否高亮
    activeLine: {
      type: Boolean,
      default: false
    },
    // 编辑器是否只读 true | false | 'nocursor'
    readOnly: {
      type: [Boolean, String],
      default: false
    },
    // 是否全屏
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      codeOptions: {
        // tab字符的宽度
        tabSize: this.tabSize,
        // 模式
        mode: this.mode,
        // 编辑器的主题样式
        theme: this.theme,
        // 是否在编辑器左侧显示行号
        lineNumbers: true,
        // 当前行背景是否高亮
        styleActiveLine: this.activeLine,
        // 编辑器是否只读
        readOnly: this.readOnly,
        // 是否全屏
        fullScreen: this.fullScreen,
        // 快捷键配置
        extraKeys: {
          Ctrl: 'autocomplete',
          // Esc键退出全屏
          'Esc'(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          }
        }
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.codeMirror.codemirror
    }
  },
  watch: {
    mode() {
      this.codemirror.setOption('mode', this.mode)
    },
    theme() {
      this.codemirror.setOption('theme', this.theme)
    }
  },
  mounted() {
    this.codemirror.setSize('auto', '400px')
  },
  methods: {
    onCodeChange(newCode) {
      this.$emit('change', newCode)
    },
    openFullScreen() {
      this.$message({ message: '将光标定位在编辑器内，按下Esc键可退出全屏模式' })
      this.codemirror.setOption('fullScreen', true)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.vue-codemirror {
  line-height: 18px;
}
</style>

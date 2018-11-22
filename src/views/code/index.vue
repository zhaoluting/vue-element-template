<template>
  <div class="app-container">
    <div class="left-panel">
      <el-form :inline="true" class="common-form">
        <el-form-item label="模式">
          <el-select v-model="modeValue" placeholder="请选择" size="small">
            <el-option v-for="item in modeList" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <svg-icon class="form-icon" icon-class="fullscreen" @click.native="changeFullScreen"/>
      </el-form>
      <codeMirror ref="codeMirror" :code="code" :mode="modeValue" :full-screen="fullScreen" @change="newCode"/>
    </div>
    <div class="right-panel">
      <p>在vue里直接使用
        <a href="https://codemirror.net/index.html" target="_blank">codemirror</a>
        会出现很多问题，为了能快速配置，选择使用基于codemirror封装的
        <a href="https://surmon-china.github.io/vue-codemirror/" target="_blank">vue-codemirror</a>组件。
      </p>
      <pre>
    功能：
    1、高亮显示代码；
    2、可选择不同主题，但需要在子组件中引入相应主题文件；
    3、按“Ctrl”键可以自动补全代码；
    4、可将编辑器全屏，将光标定位在编辑器内，按下Esc键可切换全屏模式；

    可传入的几个常用参数：
      - code(String) 代码
      - theme(String) 主题（需要在子组件中引入主题文件）
      - tabSize(Number) tab字符的宽度
      - mode(String) 模式,目前支持:text/html、text/javascript、text/css、text/x-vue、text/x-mysql、text/x-java
      - activeLine(Boolean) 当前行背景是否高亮
      - readOnly(Boolean|String) 编辑器是否只读 true | false | 'nocursor'(只读且不显示光标)
      - fullScreen(Boolean) 是否全屏

    event事件：
      - change事件必须绑定

    <a href="https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/codeMirror/index.vue" target="_blank">详细代码可点击查看</a>
      </pre>
    </div>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
import codeMirror from 'components/codeMirror/index.vue'

export default {
  components: {
    codeMirror
  },
  data() {
    return {
      modeList: ['text/html', 'text/javascript', 'text/css', 'text/x-vue', 'text/x-mysql', 'text/x-java'],
      modeValue: 'text/x-vue',
      fullScreen: false,
      code: `<template>
    <h1>欢迎使用!</h1>
</template>
<script>
  export default {
    data() {
      return {
        msg: '欢迎使用!'
      }
    }
  }
<\/script>
<style lang="scss">
  h1 {
    position: relative;
  }
</style>`
    }
  },
  methods: {
    newCode(val) {
      this.code = val
    },
    changeFullScreen() {
      this.$message({ message: '将光标定位在编辑器内，按下Esc键可切换全屏模式' })
      this.$refs.codeMirror.openFullScreen()
    }
  }
}
</script>


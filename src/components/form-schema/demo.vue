<template>
  <div class="template-index">
    <formRender :form-json="formtemplate" class="form" @clickItem="getItem"/>
    <div class="form-detial">
      <p>传按一定规则生成的json，可自动生成表单，<a href="https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/form-schema/demo.vue" target="_blank">点击查看使用说明</a></p>
      <pre class="form-model">{{ formtemplate.model }}</pre>
      <pre class="form-list">{{ formtemplate.formItems }}</pre>
    </div>
  </div>
</template>
<style src="./index.scss" lang="scss"></style>
<script>
import formRender from './index.vue'
import { formJson } from './template.js'

export default {
  components: {
    formRender
  },
  data() {
    return {
      formtemplate: {
        model: {}
      }
    }
  },
  created() {
    this.formtemplate = formJson
  },
  mounted() {
    console.log(formJson)
  },
  methods: {
    getItem(item) {
      console.log(JSON.stringify(item))
    }
  }
}
</script>

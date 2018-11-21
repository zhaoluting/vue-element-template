<template>
  <div class="template-index">
    <formRender :form-json="formtemplate" class="form" @clickItem="getItem"/>
    <div class="form-detial">
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

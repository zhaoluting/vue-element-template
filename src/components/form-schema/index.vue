<script>
// 引入自定义组件
import inputTag from 'components/simple-components/input-tag.vue'

export default {
  name: 'FormSchema',
  components: {
    // 自定义组件
    'input-tag': inputTag
  },
  props: {
    formJson: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // 普通一层组件
      commonItems: [
        'el-form',
        'el-input',
        'el-input-number',
        'el-time-select',
        'el-date-picker',
        'el-time-picker',
        'el-cascader',
        'el-switch',
        'el-rate',
        'el-slider',
        'el-color-picker'
      ],
      // 双层组件
      selectItems: ['el-radio-group', 'el-checkbox-group', 'el-select'],
      optionTypeList: ['el-radio-button', 'el-checkbox-button', 'el-option'],
      // 自定义组件
      customizeItem: ['input-tag'],
      // 常用form规则
      formRules: [
        { required: true, message: '不能为空', trigger: 'blur' },
        { required: true, type: 'date', message: '请选择时间', trigger: 'change' },
        { type: 'email', message: '邮件格式错误', trigger: 'blur' },
        { type: 'string', min: 20, message: '不得少于20个字', trigger: 'blur' },
        { type: 'array', max: 1, message: '至少选择一项', trigger: 'change' }
      ]
    }
  },
  created() {},
  methods: {
    // 判断组件层数
    checkItem(item, createElement) {
      if (
        this.commonItems.indexOf(item.type) > -1 ||
        this.customizeItem.indexOf(item.type) > -1
      ) {
        return this.commonItem(item, createElement)
      } else if (this.selectItems.indexOf(item.type) > -1) {
        return this.selectItem(item, createElement)
      } else {
        return []
      }
    },
    // 组装普通单层组件
    commonItem(item, createElement) {
      return [
        createElement(item.type, {
          props: item.attribute || {},
          style: item.style || {},
          on: {
            input: value => {
              console.log(value)
              this.formJson.model[item.formAttrs.prop] = value
              item.attribute.value = value
            }
          }
        })
      ]
    },
    // 组装双层组件
    selectItem(item, createElement) {
      const options = []
      const optionName = this.optionTypeList[this.selectItems.indexOf(item.type)]
      if (this.selectItems.indexOf(item.type) === 2) {
        item.option.map(el => {
          options.push(createElement(optionName, { props: el }))
        })
      } else {
        // 'el-radio-button', 'el-checkbox-button'组件有些不同
        item.option.map(el => {
          options.push(createElement(optionName, { props: { label: el.value }}, [el.label]))
        })
      }
      return [
        createElement(
          item.type,
          {
            props: item.attribute || {},
            style: item.style || {},
            on: {
              input: value => {
                this.formJson.model[item.formAttrs.prop] = value
              }
            }
          },
          options
        )
      ]
    },
    // 组装各个表单控件
    initRender(createElement) {
      const formItem = []
      this.formJson.formItems.map((item, index) => {
        if (this.formJson.model[item.formAttrs.prop]) {
          item.attribute.value = this.formJson.model[item.formAttrs.prop]
        }
        const inner = this.checkItem(item, createElement)
        let span = parseInt(24 / this.formJson.number)
        if (span < 1 || span === 'NAN') span = 24
        formItem.push(
          createElement(
            'el-col',
            {
              props: { span: span },
              nativeOn: {
                click: () => {
                  this.$emit('clickItem', item)
                }
              }
            },
            [createElement('el-form-item', { props: item.formAttrs }, inner)]
          )
        )
      })
      return formItem
    }
  },
  // 渲染
  render(createElement) {
    const formItem = this.initRender(createElement)
    if (!this.formJson.attribute) this.formJson.attribute = {}
    this.formJson.attribute.labelWidth = this.formJson.attribute.labelWidth || '100px'
    this.formJson.attribute.ref = 'schemaForm'
    this.formJson.attribute.model = this.formJson.model
    const form = createElement(
      this.formJson.type,
      { props: this.formJson.attribute || {}},
      [createElement('el-row', formItem)]
    )
    return form
  }
}
</script>

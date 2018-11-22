/*
简易版
formJson = {
  type: 'el-form',
  number: 2, // 一行几个控件，默认1
  model: { // 【必填】定义form表单提交时的model数据
    name: '',
  },
  attribute: { // 最外层form组件的属性
    rules: {}, // 校验规则
    labelWidth: '100px', // 标签文本长度，为了美观可根据字数设置下
  },
  formItems: [{ // 定义表单里各个控件（以下例子包含各个类型控件）
    type: 'el-input', // 【必填】各个FormItem里表单控件类型
    formAttrs: { // 【必填】设置各个FormItem的属性
      label: '名称', // 标签文本
      prop: 'name', // 需要与model中的字段对应
    },
    attribute: {}, // 该控件的属性，可参照elementUI官网各个组件的API（http://element-cn.eleme.io/#/zh-CN）
    style: {}, // 设置该控件的样式
  }],
}
*/

export const formJson = {
  type: 'el-form',
  number: 2,
  model: {
    inputTagValue: ['tags'],
    inputValue: 'ddd',
    inputNumberValue: 11,
    timeSelectValue: '',
    datePickerValue: '',
    timePickerValue: '',
    cascaderValue: ['jiangsu', 'nanjing'],
    switchValue: false,
    rateValue: 2,
    sliderValue: 10,
    colorPickerValue: '#19be6b',
    radioGroupValue: 'shanghai',
    checkboxGroupValue: ['shanghai'],
    selectVaule: ['shanghai']
  },
  attribute: {
    rules: {
      inputValue: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ]
    },
    labelWidth: '100px'
  },
  formItems: [{
    type: 'el-input',
    formAttrs: {
      label: '输入框',
      prop: 'inputValue'
    },
    attribute: {
      placeholder: '输入框',
      clearable: true,
      maxlength: 10
    }
  }, {
    type: 'el-input-number',
    formAttrs: {
      label: '数字输入框',
      prop: 'inputNumberValue'
    },
    attribute: {
      max: 100,
      min: 10
    }
  }, {
    type: 'el-time-select',
    formAttrs: {
      label: '固定时间点',
      prop: 'timeSelectValue'
    },
    attribute: {
      pickerOptions: {
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }
    }
  }, {
    type: 'el-date-picker',
    formAttrs: {
      label: '日期选择器',
      prop: 'datePickerValue'
    },
    attribute: {
      type: 'date',
      placeholder: '起始日期'
    },
    style: {
      width: '280px'
    }
  }, {
    type: 'el-time-picker',
    formAttrs: {
      label: '时间选择器',
      prop: 'timePickerValue'
    },
    attribute: {
      placeholder: '请选择时间',
      format: 'HH:mm:ss'
    }
  }, {
    type: 'el-cascader',
    formAttrs: {
      label: '级联选择',
      prop: 'cascaderValue'
    },
    attribute: {
      placeholder: '请选择',
      filterable: true,
      options: [{
        value: 'beijing',
        label: '北京',
        children: [{ value: 'gugong', label: '故宫' }]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [{ value: 'nanjing', label: '南京' }]
      }]
    }
  }, {
    type: 'el-switch',
    formAttrs: {
      label: '开关',
      prop: 'switchValue'
    },
    attribute: {}
  }, {
    type: 'el-rate',
    formAttrs: {
      label: '评分',
      prop: 'rateValue'
    },
    attribute: {
      showScore: true
    }
  }, {
    type: 'el-slider',
    formAttrs: {
      label: '百分比',
      prop: 'sliderValue'
    },
    attribute: {
      showInput: true
    }
  }, {
    type: 'el-select',
    formAttrs: {
      label: '选择器',
      prop: 'selectVaule'
    },
    attribute: {
      multiple: true,
      filterable: true
    },
    option: [{
      label: '上海',
      value: 'shanghai'
    }, {
      label: '杭州',
      value: 'hangzhou'
    }]
  }, {
    type: 'el-radio-group',
    formAttrs: {
      label: '单选框',
      prop: 'radioGroupValue'
    },
    attribute: {
      size: 'small'
    },
    option: [{
      label: '上海',
      value: 'shanghai'
    }, {
      label: '杭州',
      value: 'hangzhou'
    }]
  }, {
    type: 'el-checkbox-group',
    formAttrs: {
      label: '多选框',
      prop: 'checkboxGroupValue'
    },
    attribute: {
      size: 'small'
    },
    option: [{
      label: '上海',
      value: 'shanghai'
    }, {
      label: '杭州',
      value: 'hangzhou'
    }]
  }, {
    type: 'el-color-picker',
    formAttrs: {
      label: '颜色',
      prop: 'colorPickerValue'
    },
    attribute: {
      size: 'small'
    }
  }, {
    type: 'input-tag',
    formAttrs: {
      label: '标签输入框',
      prop: 'inputTagValue'
    },
    attribute: {}
  }]
}

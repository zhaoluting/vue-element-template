
/*
* @desc: 全局数据配置
* job类型、优先级
* 使用filter可直接获取，若想单独引入：
    1、头部引入 import globalMap from '.....globalMap';
    2、再用globalMap.get('loanProductType')获取即可
*/
const globalMap = new Map([
  // job类型
  ['jobType', [
    {
      value: '1',
      name: 'Hive SQL'
    },
    {
      value: '2',
      name: 'SHELL'
    },
    {
      name: 'PYTHON',
      value: '7'
    },
    {
      name: '实时任务',
      value: '51'
    },
    {
      value: '3',
      name: 'IMPORT'
    },
    {
      value: '4',
      name: 'EXPORT'
    },
    {
      name: 'DBus任务',
      value: '6'
    },
    {
      name: 'SPARK',
      value: '8'
    },
    {
      value: '5',
      name: '空任务'
    },
    {
      value: '9',
      name: '数据交换'
    }
  ]],
  // 优先级
  ['priorityLevel', [
    {
      value: '1',
      name: '低'
    },
    {
      value: '5',
      name: '中'
    },
    {
      value: '9',
      name: '高'
    }
  ]],
  ['statusMap', [
    {
      value: 'published',
      name: '成功'
    }, {
      value: 'draft',
      name: '失败'
    }, {
      value: 'deleted',
      name: '失效'
    }
  ]]
])
export default globalMap


import moment from 'moment'
import globalMap from './globalMap.js'

// 字段转化
export function statusToName(value, name) {
  let toName = value
  let mapping = []
  if (globalMap.has(name)) {
    mapping = globalMap.get(name)
  }
  mapping.forEach((element) => {
    if (element.value === value) {
      toName = element.name
      return
    }
  })
  if (toName === value && mapping[mapping.length - 1].value === 'default') {
    return mapping[mapping.length - 1].name
  }
  return toName
}

// 日期格式化
export function formatDate(value, format = 'YYYY-MM-DD') {
  const date = moment(value).format(format)
  return date
}
// 日期格式化
export function formatDateTime(value, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = moment(value).format(format)
  return date
}

// 保留 N 位小数
export function fixNumber(value, num = 2) {
  parseFloat(value).toFixed(num)
}

// 数字百分比格式化
export function toPercent(point) {
  let str = ''
  if (typeof point === 'number') {
    str = Number(point * 100).toFixed(2)
    str += '%'
  } else {
    str = (point === undefined || point === null) ? '-' : point
  }
  return str
}

// 金额格式化
export function formatCurrency(value, symbol = '￥', num = 2) {
  if (!value) value = 0
  const val = (value / 1).toFixed(num)
  return `${symbol}${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

// 下载文件路径格式化
export function getUrlPath(value) {
  console.log(process.env.BASE_API + value)
  return process.env.BASE_API + value
}

/* 公共函数
  引入：import { parseTime } from '@/utils'
*/
import moment from 'moment'

/*
* @desc: 对入参进行统一处理。
* @主要功能：删除空对象，将range类型日期数组转成两个时间字符串
*/
export function handleParams(params) {
  const obj = Object.assign({}, params)
  for (const key in obj) {
    // 处理单个 date
    if (moment.isMoment(obj[key])) {
      obj[key] = obj[key].format('YYYY-MM-DD')
    }
    // 处理 rangeDate
    if (key.indexOf('rangeOne') !== -1) {
      if (obj[key].length) {
        const pre = key.split('__')[0]
        obj[`${pre}CreateMin`] = obj[key][0].format('YYYY-MM-DD HH:mm:ss')
        obj[`${pre}CreateMax`] = obj[key][1].format('YYYY-MM-DD HH:mm:ss')
      }
      delete obj[key]
    }
    // 处理 rangeDate
    if (key.indexOf('rangeTwo') !== -1) {
      if (obj[key].length) {
        const pre = key.split('__')[0]
        obj[`min${pre}`] = obj[key][0].format('YYYY-MM-DD')
        obj[`max${pre}`] = obj[key][1].format('YYYY-MM-DD')
      }
      delete obj[key]
    }
    // 如果对象为空，则删除此对象
    if (!obj[key] && !(obj[key] === 0)) delete obj[key]
    else obj[key] = obj[key].toString().replace(/^\s+|\s+$/g, '')
  }
  return obj
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

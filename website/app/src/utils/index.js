//
import _ from 'underscore'
import moment from 'moment'
import store from '../store/index'

let debug = false
const locStrg = window.localStorage || null
const slice = Array.prototype.slice

if (typeof window !== 'undefined' && window.Vue) {
  debug = window.Vue.config.debug || !window.Vue.config.silent
}

/**
 * @description 检测类型
 * @param obj
 * @returns {*}
 */
export function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/**
 * @description
 */
export default function () { }

/**
 * @description 格式化时间戳
 * @param value
 * @param formatString
 * @returns {*}
 */
export function dateFormat (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
}

/**
 * @description
 * @param msg
 */
export function log (msg) {
  if (!_.isUndefined(window.console) && debug) {
    window.console.log('[log]: ' + msg)
  }
}

/**
 * @description
 * @param msg
 */
export function info (msg) {
  if (!_.isUndefined(window.console) && debug) {
    window.console.info('[info]: ' + msg)
  }
}

/**
 * @description
 * @param msg
 */
export function warn (msg) {
  if (!_.isUndefined(window.console) && debug) {
    window.console.warn('[warn]: ' + msg)
  }
}

/**
 * @description
 * @param msg
 */
export function error (msg) {
  if (!_.isUndefined(window.console) && debug) {
    window.console.error('[error]: ' + msg)
  }
}

/**
 * @description
 * @param obj
 */
export function isString (obj) {
  return _.isString(obj)
}

/**
 * @description
 * @param object
 * @returns {*}
 */
export function isNumber (object) {
  return typeOf(object) === 'number'
}

/**
 * @description
 * @param object
 * @returns {*}
 */
export function isFunction (object) {
  return _.isFunction(object)
}

/**
 * @description
 * @param object
 * @returns {*}
 */
export function isArray (object) {
  return typeOf(object) === 'array'
  // return _.isArray(object)
}

/**
 * @description
 * @param object
 * @returns {*}
 */
export function isObject (object) {
  return typeOf(object) === 'object'
  // return _.isObject(object)
}

/**
 * @description
 * @param object
 * @returns {*}
 */
export function isDate (object) {
  return typeOf(object) === 'date'
}

/**
 * @description
 * @param value
 * @returns {*}
 */
export function isUndefined (value) {
  return typeOf(value) === 'undefined'
  // return _.isUndefined(value)
}

/**
 * @description
 * @param value
 * @returns {*}
 */
export function isNull (value) {
  return typeOf(value) === 'null'
  // return _.isNull(value)
}

/**
 * @description 过滤
 * @param obj
 * @param predicate
 * @param context
 * @returns {Array}
 */
export function filter (obj, predicate, context) {
  return _.filter(obj, predicate, context)
}

/**
 * @description 查找
 * @param obj
 * @param predicate
 * @param context
 * @returns {*}
 */
export function find (obj, predicate, context) {
  return _.find(obj, predicate, context)
}

/**
 * @description 去重
 * @param array
 * @param isSorted
 * @param iteratee
 * @returns {*}
 */
export function uniq (array, isSorted, iteratee) {
  return _.uniq(array, isSorted, iteratee)
}

/**
 * @description 获取指定第一个值
 * @param list
 * @param predicate
 * @param context
 * @returns {Object|{}}
 */
export function filterFirst (list, predicate, context) {
  return _.find(list, predicate, context) || {}
  // let arr = _.filter(obj, predicate)
  // return arr && arr.length ? arr[0] : {}
}

/**
 * @description
 * @returns {*}
 */
export function extend () {
  return _.extend.apply(null, slice.call(arguments, 0))
}

/**
 * @description 获取集合中某一项
 * @param list
 * @param propertyName
 * @returns {*}
 */
export function pluck (list, propertyName) {
  return _.pluck(list, propertyName)
}

/**
 * @description
 * @param arrs
 * @param val
 * @param isSorted
 * @returns {*}
 */
export function indexOf (arrs, val, isSorted) {
  return _.indexOf(arrs, val, isSorted)
}

/**
 * @description 查找第一个所在的索引
 * @param array
 * @param predicate
 * @param context
 * @returns {*}
 */
export function findIndex (array, predicate, context) {
  return _.findIndex(array, predicate, context)
}

/**
 * @description
 * @returns {*}
 */
export function inArray (arrs, val, isSorted) {
  return indexOf(arrs, val, isSorted) > -1
}

/**
 * @description 变换多维数组
 * @param array
 * @param shallow
 */
export function flatten (array, shallow) {
  return _.flatten(array, shallow)
}

/**
 * @description 比较对象或数组是否全相等
 * @returns {boolean}
 */
export function isEquals (objA, objB) {
  let isDuplicate = true
  const doEquals = (objA, objB) => {
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      isDuplicate = false
      return
    }
    Object.keys(objA).forEach(key => {
      const field1 = objA[key]
      const field2 = objB[key]
      if (typeof field1 === 'object' && typeof field2 === 'object') {
        doEquals(field1, field2)
      }
      if (field1 !== field2 && typeof field1 !== 'object') {
        isDuplicate = false
      }
    })
  }
  doEquals(objA, objB)
  return isDuplicate
}

/**
 * @description 防抖动
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
export function debounce (func, wait, immediate) {
  let timeout
  let args
  let context
  let timestamp
  let result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * @description
 * @param list
 * @param iteratee
 * @param context
 */
export function sortBy (list, iteratee, context) {
  return _.sortBy(list, iteratee, context)
}

/**
 * @description 深拷贝
 * @param data
 * @returns {*}
 */
export function deepCopy (data) {
  let o
  if (isArray(data)) {
    o = []
  } else if (isObject(data)) {
    o = {}
  } else {
    return data
  }
  if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (isObject(data)) {
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

/**
 * @description
 * @param obj
 * @returns {string}
 */
export function stringifyQuery (obj) {
  let res = null
  if (obj) {
    res = Object.keys(obj).map(function (key) {
      const encode = window.encodeURIComponent
      const val = obj[key]
      if (val === undefined) {
        return ''
      }
      if (val === null) {
        return encode(key)
      }
      if (Array.isArray(val)) {
        const result = []
        val.slice().forEach(function (val2) {
          if (val2 === undefined) {
            return
          }
          if (val2 === null) {
            result.push(encode(key))
          } else {
            result.push(encode(key) + '=' + encode(val2))
          }
        })
        return result.join('&')
      }
      return encode(key) + '=' + encode(val)
    }).filter(function (x) { return x.length > 0 }).join('&')
  }
  return (res || '')
}

/**
 * @description
 * @param value
 * @param currency
 * @param decimals
 * @returns {*}
 */
export function currencyHandle (value, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g
  if (!isFinite(value) || (!value && value !== 0)) {
    return value
  }
  value = parseFloat(value)
  currency = currency != null ? currency : ''
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  const i = _int.length % 3
  const head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  const _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  const sign = value < 0 ? '-' : ''
  return sign + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float + (currency ? (' ' + currency) : '')
}

/**
 * @description 设置cookie
 * @param name
 * @param value
 * @param expiredays
 */
export function setCookie (name, value, expiredays, isClear) {
  const exdate = new Date()
  exdate.setTime((!!isClear === true ? -1 : 1) * exdate.getTime() + expiredays * 86400000)
  document.cookie = name + '=' + escape(value) + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString())
}

/**
 * @description 获取cookie
 * @param name
 * @returns {string}
 */
export function getCookie (name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

/**
 * @description 清除cookie
 * @param name
 */
export function clearCookie (name) {
  setCookie(name, '', -1)
}

/**
 * @description
 * @param str
 * @returns {*|XML|string|void}
 */
export function trim (str) {
  return str.replace(/^\s*|\s*$/g, '')
}

/**
 * @description
 * @param str
 * @returns {string}
 */
export function toLower (str) {
  return str ? str.toLowerCase() : ''
}

/**
 * @description
 * @param str
 * @returns {string}
 */
export function toUpper (str) {
  return str ? str.toUpperCase() : ''
}

/**
 * @description
 * @param val
 * @returns {boolean}
 */
export function isBoolean (val) {
  return _.isBoolean(val)
}

/**
 * @description
 * @param obj
 * @returns {boolean}
 */
export function isPlainObject (obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

/**
 * @description
 * @param obj
 * @returns {boolean}
 */
export function isBlob (obj) {
  return typeOf(window.Blob) !== 'undefined' && obj instanceof window.Blob
}

/**
 * @description
 * @param obj
 * @returns {boolean}
 */
export function isFormData (obj) {
  return typeOf(window.Blob) !== 'undefined' && obj instanceof window.FormData
}

/**
 * @description 复制Objext
 * @param source
 * @param deep
 * @returns {*}
 */
export function copy (source, deep) {
  if (isNull(source) || !isObject(source)) {
    return source
  }
  let name
  let value
  const target = isArray(source) ? [] : {}
  if (!deep && Object.assign) {
    return Object.assign(target, source)
  }
  for (name in source) {
    value = source[name]
    if (value === source) {
      continue
    }
    if (deep && (isArray(value) || isObject(value))) {
      target[name] = copy(value, deep)
    } else {
      target[name] = value
    }
  }
  return target
}

/**
 * @description
 * @param key
 * @param values
 * @constructor
 */
export function setMark (key, values) {
  const ts = (new Date()).getTime()
  if (locStrg) {
    if (isObject(values)) {
      locStrg.setItem(key, JSON.stringify(values))
    } else if (isString(values)) {
      locStrg.setItem(key, values)
    }
  } else {
    let day = 7
    if (isObject(values)) {
      if (values.expires) {
        if (values.modified) {
          day = Math.floor((values.expires - values.modified) / 86400000)
        } else {
          day = Math.floor((values.expires - ts) / 86400000)
        }
      }
      values = JSON.stringify(values)
    }
    setCookie(key, values, day)
  }
}

/**
 * @description
 * @param key
 * @returns {string}
 * @constructor
 */
export function getMark (key) {
  let val = ''
  const ts = (new Date()).getTime()
  if (locStrg) {
    val = locStrg.getItem(key) || ''
  } else {
    val = getCookie(key)
  }
  if (val) {
    if (/^{(.*)}$/gi.test(val)) {
      const values = JSON.parse(val)
      if (values.expires && (values.expires - ts) >= 0) {
        return values
      } else {
        return ''
      }
    }
    return val
  }
  return ''
}

/**
 * @description
 * @param key
 */
export function removeMark (key) {
  if (locStrg) {
    locStrg.removeItem(key)
  } else {
    setCookie(key, '', -1)
  }
}

/**
 * @description 数据容量单位转换
 * @param bytes
 * @param precision
 * @returns {*}
 */
export function bytesToSize (bytes, precision) {
  if (bytes === 0) {
    return '0 B'
  }
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(precision || 3) + ' ' + sizes[i]
}

/**
 * @description 组合生成完整的url
 * @param {ajaxParams in instance} url
 */
export function generateUrl (url) {
  const baseUrl = (store && store.getters && store.getters.BASE_API_URL) || ''
  if (!baseUrl) {
    return ''
  }
  return baseUrl + url
}

export function formatMoney (val, fixed = 0) {
  const str = +val === val && fixed !== 'auto' ? val.toFixed(fixed) : val + ''
  const res = str.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('')

  return res
}

export function formatterLineChartDataset (datas = [], names = [], { x = 'hour', y = 'money' } = {}) {
  if (!datas.length || !datas[0].length) {
    return {
      dataset: [],
      effectData: []
    }
  }

  const lastIndex = datas[0].length - 1
  const lastItem = datas[0][lastIndex] || {}
  let baseIndex = 0
  let length = 0
  const labels = [lastItem[x]]
  const source = [[x, ...names]]
  const dataset = { source }

  datas.forEach((item, index) => {
    const name = names[index] || ''
    const curr = item[lastIndex] || {}

    if (item.length && item.length > length) {
      baseIndex = index
      length = item.length
    }

    labels.push(name + ' ' + formaterMoney(curr[y]))
  })

  const baseList = datas[baseIndex] || []
  baseList.forEach((item, index) => {
    const label = `${item[x]}`
    const list = [label]

    datas.forEach(data => {
      list.push(data[index] && data[index][y])
    })

    source.push(list)
  })

  return {
    dataset,
    effectData: [{
      name: names[0],
      value: [labels[0], lastItem && lastItem[y]],
      label: {
        position: 'left',
        // offset: lastIndex > length - 2 ? [-100, -10] : [-40, -10],
        formatter: labels.join('\n\n')
      }
    }]
  }
}

export function getObjectType (data) {
  const str = Object.prototype.toString.apply(data)
  const [, type] = /\[object (.+)\]/.exec(str)

  return type
}

export function isEmpty (obj) {
  const hasOwnProperty = Object.prototype.hasOwnProperty
  // 本身为空直接返回true
  if (obj == null) return true
  if (typeof obj === 'number') return false
  // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
  if (obj.length > 0) return false
  if (obj.length === 0) return true
  // 最后通过属性长度判断。
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }

  return true
}

export function numAdd (num1, num2) {
  let baseNum1, baseNum2
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }

  const baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  return (num1 * baseNum + num2 * baseNum) / baseNum
}

// 生成大写字母  a的Unicode值为97
export function generateSmall () {
  const str = []
  for (let i = 97; i < 123; i++) {
    str.push(String.fromCharCode(i))
  }
  return str
}
export function getAge(_birthday) {
  // 新建日期对象
  let birthday = moment(_birthday).format('YYYY-MM-DD').split('-')
  let date = new Date()
  // 今天日期，数组，同 birthday
  let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  // 分别计算年月日差值
  let age = today.map((value, index) => {
    return value - birthday[index]
  })
  // 当天数为负数时，月减 1，天数加上月总天数
  if (age[2] < 0) {
    // 简单获取上个月总天数的方法，不会错
    let lastMonth = new Date(today[0], today[1], 0)
    age[1]--
    age[2] += lastMonth.getDate()
  }
  // 当月数为负数时，年减 1，月数加上 12
  if (age[1] < 0) {
    age[0]--
    age[1] += 12
  }
  return age
}
export function removeProperty(obj) {
  Object.keys(obj).forEach(item => {
    if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
  })
  return obj
}

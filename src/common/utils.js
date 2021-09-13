/**
 *
 * @param func 一个可能被多次调用的 函数
 * @param delay 延时 时间
 * @returns {(function(...[*]=): void)|*} 返回一个新的函数
 *
 * 用法示例：
 * const refresh = this.debounce(this.$refs.scroll.refresh, 500)
 *
 * this.$bus.$on('itemImgLoad', () => {
 *    console.log('-----');
 *    refresh('111','222')
 * })
 *
 */

export function debounce(func, delay) {
  let timer = null

  // ...args 为调用的时候传递的参数，... 表示可以传递多个参数
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt) {
  if (typeof date == 'string') {
    return date;
  }

  if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";

  if (!date || date == null) return null;
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  // 获取年份
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

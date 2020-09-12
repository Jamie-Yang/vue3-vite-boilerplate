interface IRemainTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

interface IDateTime {
  year: number
  month: number
  date: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

/**
 * 解析倒计时为易于操作的自定义对象
 * @param remain 剩余毫秒数
 */
export function parseRemainTime(remain: number): IRemainTime {
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  return {
    days: Math.floor(remain / DAY),
    hours: Math.floor((remain % DAY) / HOUR),
    minutes: Math.floor((remain % HOUR) / MINUTE),
    seconds: Math.floor((remain % MINUTE) / SECOND),
    milliseconds: Math.floor(remain % SECOND),
  }
}

/**
 * 解析日期对象为易于操作的自定义对象
 * @param date 日期对象
 */
export function parseDate(date: Date): IDateTime {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  }
}

/**
 * 剩余时间格式化
 * @param {number} remain 剩余毫秒数
 * @param {string} format 格式描述：d天 HH:mm:ss.SSS
 * @returns {string} 格式化结果：1天 12:00:00.00
 */
export function formatRemainTime(remain: number, format: string): string {
  return formatTime(parseRemainTime(remain), format)
}

/**
 * 时间格式化
 * @param {Date} date 时间对象
 * @param {string} format 格式描述：YYYY-MM-DD HH:mm:ss.SSS
 * @returns {string} 格式化结果：2020-01-01 12:00:00.000
 */
export function formatDate(date: Date, format: string): string {
  return formatTime(parseDate(date), format)
}

/**
 * 时间格式标记替换通用逻辑
 * @param {IRemainTime | IDateTime} time 时间对象：形式如defaults
 * @param {string} format 格式描述：YYYY-MM-DD HH:mm:ss.SSS 或 d天 HH:mm:ss.SSS
 * @returns {string} 2020-01-01 12:00:00.000 或 1天 12:00:00.00
 */
function formatTime(time: IRemainTime | IDateTime, format = 'HH:mm:ss'): string {
  const defaults = {
    year: 0,
    month: 0,
    date: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }

  const t = { ...defaults, ...time }

  const map: { [key: string]: number } = {
    'Y+': t.year,
    'M+': t.month,
    'D+': t.date,
    'H+': t.hours,
    'm+': t.minutes,
    's+': t.seconds,
    'S+': t.milliseconds,
    d: t.days,
  }

  let result = format

  for (const k in map) {
    if (new RegExp(`(${k})`).test(format)) {
      const matched = RegExp.$1
      let v = String(map[k])
      if (k !== 'd') {
        v = ('00' + v).slice(-matched.length)
      }
      result = result.replace(matched, v)
    }
  }
  return result
}

/**
 * 转换剩余时间为对象形式
 * @param {number} remain 剩余毫秒数
 * @returns {object}
 */
export function convertRemainTime(remain: number): unknown {
  return convertTime(parseRemainTime(remain))
}

/**
 * 转换时间为对象形式
 * @param {Date} date 时间对象
 * @returns {object}
 */
export function convertDate(date: Date): unknown {
  return convertTime(parseDate(date))
}

/**
 * 转换对象的字段为字符串
 */
function convertTime(time: IRemainTime | IDateTime): unknown {
  const result: { [key: string]: number | string } = { ...time }

  for (const k in time) {
    const v = String(result[k])
    if (k === 'year' || k === 'days') {
      result[k] = v
    } else if (k === 'milliseconds') {
      result[k] = `00${v}`.slice(-3)
    } else {
      result[k] = `00${v}`.slice(-2)
    }
  }
  return result
}

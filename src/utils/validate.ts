import type { Numeric } from './types'

export const isNumeric = (val: Numeric): val is string => typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)

export const isObject = (val: unknown): val is object => val !== null && typeof val === 'object'

import { Numeric } from './types'

export const isNumeric = (val: Numeric): val is string => typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)

export const isObject = (val: unknown): val is Record<string, unknown> => val !== null && typeof val === 'object'

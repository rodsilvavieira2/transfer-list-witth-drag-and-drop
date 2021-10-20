import { ListItemAttr } from '../@types'

export const not = (a: ListItemAttr[], b: ListItemAttr[]) => {
  return a.filter((value) => b.indexOf(value) === -1)
}

export const intersection = (a: ListItemAttr[], b: ListItemAttr[]) => {
  return a.filter((value) => b.indexOf(value) !== -1)
}

export const union = (a: ListItemAttr[], b: ListItemAttr[]) => {
  return [...a, ...not(b, a)]
}

export const isAllCheck = (checked: ListItemAttr[], items: ListItemAttr[]) => {
  return checked.length === items.length && items.length !== 0
}
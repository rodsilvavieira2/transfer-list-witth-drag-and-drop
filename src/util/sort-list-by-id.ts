import { ListItemAttr } from '../@types'

export const sortListById = (items: ListItemAttr[]) => {
  return items.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    }

    return -1
  })
}

import { ListItemAttr } from '../@types'
import { intersection, isAllCheck, not, union } from '../util'
import { sortListById } from '../util/sort-list-by-id'

export type ListState = {
  left: ListItemAttr[]
  right: ListItemAttr[]
  checked: ListItemAttr[]
  leftChecked: ListItemAttr[]
  rightChecked: ListItemAttr[]
  isAllLeftChecked: boolean
  isAllRightChecked: boolean
}

export const listInitialState: ListState = {
  left: [],
  right: [],
  checked: [],
  leftChecked: [],
  rightChecked: [],
  isAllLeftChecked: false,
  isAllRightChecked: false
}

type Side = 'left' | 'right'

export type ListActions =
  | {
      type: 'move-to-right'
    }
  | {
      type: 'move-to-left'
    }
  | {
      type: 'handle-toggle'
      payload: {
        item: ListItemAttr
      }
    }
  | {
      type: 'handle-drop-item'
      payload: {
        id: number
        side: Side
      }
    }
  | {
      type: 'toggle-all'
      payload: {
        items: ListItemAttr[]
      }
    }
  | {
      type: 'change-order'
      payload: {
        fromId: number
        toId: number
        position: Side
      }
    }

export const listReducer = (
  state: ListState,
  action: ListActions
): ListState => {
  const doAction = () => {
    switch (action.type) {
      case 'move-to-right': {
        const { right, leftChecked, left, checked } = state

        return {
          ...state,
          right: [...right, ...leftChecked],
          left: not(left, leftChecked),
          checked: not(checked, leftChecked),
          leftChecked: intersection(checked, left)
        }
      }

      case 'move-to-left': {
        const { right, rightChecked, left, checked } = state

        return {
          ...state,
          right: not(right, rightChecked),
          left: [...left, ...rightChecked],
          checked: not(checked, rightChecked),
          rightChecked: intersection(checked, right)
        }
      }

      case 'handle-toggle': {
        const { checked } = state
        const { item } = action.payload

        const itemIndex = checked.indexOf(item)

        if (itemIndex > -1) {
          return {
            ...state,
            checked: checked.filter((lisItem) => lisItem.id !== item.id)
          }
        }

        return {
          ...state,
          checked: [...checked, item]
        }
      }

      case 'change-order': {
        const { fromId, toId, position } = action.payload

        const reorder = (side: ListItemAttr[]) => {
          const existsOnThisSide = side.some((item) => item.id === fromId)

          if (!existsOnThisSide) {
            return state[position]
          }

          const result = side.map((item) => {
            if (item.id === fromId) {
              item.id = toId
              return item
            }

            if (item.id === toId) {
              item.id = fromId
              return item
            }

            return item
          })

          return result
        }

        return {
          ...state,
          [position]: reorder(state[position])
        }
      }

      case 'toggle-all': {
        const { items } = action.payload
        const { checked } = state

        if (intersection(checked, items).length === items.length) {
          return {
            ...state,
            checked: not(checked, items)
          }
        }

        return {
          ...state,
          checked: union(checked, items)
        }
      }

      case 'handle-drop-item': {
        const { id, side } = action.payload
        const { right, left } = state

        if (side === 'left') {
          const itemIndex = right.findIndex((item) => item.id === id)

          if (itemIndex > -1) {
            const rightItem = right[itemIndex]

            return {
              ...state,
              left: [...left, rightItem],
              right: not(right, [rightItem])
            }
          }

          return state
        } else {
          const itemIndex = left.findIndex((item) => item.id === id)
          if (itemIndex > -1) {
            const leftItem = left[itemIndex]

            return {
              ...state,
              right: [...right, leftItem],
              left: not(left, [leftItem])
            }
          }

          return state
        }
      }

      default: {
        return state
      }
    }
  }

  const newState = doAction()

  const { left, right, checked } = newState

  const rightChecked = intersection(right, checked)

  const leftChecked = intersection(left, checked)

  const notSortItemsOn = ['handle-toggle', 'toggle-all']

  return {
    ...newState,
    isAllLeftChecked: isAllCheck(leftChecked, left),
    isAllRightChecked: isAllCheck(rightChecked, right),
    left: notSortItemsOn.includes(action.type) ? left : sortListById(left),
    right: notSortItemsOn.includes(action.type) ? right : sortListById(right),
    leftChecked,
    rightChecked
  }
}

import { ListItemAttr } from '../@types'
import { intersection, not } from '../util'

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
        side: Side
      }
    }
  | {
      type: 'handle-drop-item'
      payload: {
        id: number
        side: Side
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
        const { checked, left, right } = state
        const { item, side } = action.payload

        const checkItem = (side: ListItemAttr[]) => {
          const itemIndex = side.indexOf(item)

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

        if (side === 'left') {
          return checkItem(left)
        }

        return checkItem(right)
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

  const isAllRightChecked = intersection(right, checked).length === right.length

  const isAllLeftChecked = intersection(left, checked).length === left.length

  return {
    ...newState,
    isAllLeftChecked,
    isAllRightChecked
  }
}

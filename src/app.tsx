import { useReducer } from 'react'
import { ListItemAttr } from './@types'
import { List, Container, ListContainer } from './components'
import { Controllers } from './components/controllers'
import { listInitialState, listReducer } from './reduces'
import { intersection } from './util'

const listItems = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  text: `list item ${index + 1}`,
  isChecked: false
}))

export const App = () => {
  const [state, dispatch] = useReducer(
    listReducer,
    listInitialState,
    (state) => ({
      ...state,
      left: listItems
    })
  )

  const { checked, left, right, isAllLeftChecked, isAllRightChecked } = state

  const numberOfChecked = (items: ListItemAttr[]) => {
    return intersection(checked, items).length
  }

  return (
    <Container>
      <ListContainer>
        <List
          header="Choices"
          maxHeight={'10rem'}
          listItems={left}
          checked={checked}
          dispatch={dispatch}
          isAllItemChecked={isAllLeftChecked}
          isPartialChecked={!isAllLeftChecked && numberOfChecked(left) !== 0}
          onDropItem={(id) =>
            dispatch({
              type: 'handle-drop-item',
              payload: {
                id,
                side: 'left'
              }
            })
          }
        />

        <Controllers dispatch={dispatch} />

        <List
          header="Chosen"
          maxHeight={'10rem'}
          listItems={right}
          checked={checked}
          dispatch={dispatch}
          isAllItemChecked={isAllRightChecked}
          isPartialChecked={!isAllRightChecked && numberOfChecked(right) !== 0}
          onDropItem={(id) =>
            dispatch({
              type: 'handle-drop-item',
              payload: {
                id,
                side: 'right'
              }
            })
          }
        />
      </ListContainer>
    </Container>
  )
}

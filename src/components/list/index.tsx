import { Dispatch, DragEvent, useCallback, useState } from 'react'

import { ListItemAttr } from '../../@types'
import { ListActions } from '../../reduces'
import { RadioInput } from '../form'
import { ListItem } from './list-item'
import { Container, Header, ListItems } from './styles'

type ListPops = {
  header: string
  position: 'left' | 'right'
  listItems: ListItemAttr[]
  isAllItemChecked: boolean
  isPartialChecked: boolean
  checked: ListItemAttr[]
  dispatch: Dispatch<ListActions>
}

export const List = ({
  header,
  listItems,
  isAllItemChecked,
  isPartialChecked,
  checked,
  dispatch,
  position
}: ListPops) => {
  const [isReadyToDrop, setIsReadyToDrop] = useState(false)

  const handleDragHover = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragDrop = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setIsReadyToDrop(false)

    const id = e.dataTransfer.getData('text')

    if (id) {
      dispatch({
        type: 'handle-drop-item',
        payload: {
          id: Number(id),
          side: position
        }
      })
    }
  }

  const handleDropItem = useCallback(
    (from: number, to: number) => {
      dispatch({
        type: 'change-order',
        payload: {
          fromId: from,
          toId: to,
          position
        }
      })
    },
    [dispatch, position]
  )

  return (
    <Container>
      <Header>
        <RadioInput
          isAllChecked={isAllItemChecked}
          isPartialChecked={isPartialChecked}
          disabled={listItems.length === 0}
          onClick={() =>
            dispatch({
              type: 'toggle-all',
              payload: {
                items: listItems
              }
            })
          }
        />

        <span>{header}</span>
      </Header>

      <ListItems
        role="list"
        onDragOver={handleDragHover}
        onDrop={handleDragDrop}
        isReadyToDrop={isReadyToDrop}
        onDragEnter={() => setIsReadyToDrop(true)}
        onDragLeave={() => setIsReadyToDrop(false)}
      >
        {listItems.map((item) => (
          <ListItem
            {...item}
            key={item.id}
            isChecked={checked.indexOf(item) !== -1}
            onChangeChecked={() =>
              dispatch({
                type: 'handle-toggle',
                payload: {
                  item
                }
              })
            }
            onDrop={handleDropItem}
          />
        ))}
      </ListItems>
    </Container>
  )
}

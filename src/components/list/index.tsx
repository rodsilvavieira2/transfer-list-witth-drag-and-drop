import { Dispatch, DragEvent } from 'react'

import { ListItemAttr } from '../../@types'
import { ListActions } from '../../reduces'
import { RadioInput } from '../form'
import { ListItem } from './list-item'
import { Container, Header, ListItems } from './styles'

type ListPops = {
  header: string
  listItems: ListItemAttr[]
  maxHeight: string | number
  isAllItemChecked: boolean
  isPartialChecked: boolean
  checked: ListItemAttr[]
  dispatch: Dispatch<ListActions>
  onDropItem: (id: number) => void
}

export const List = ({
  header,
  listItems,
  isAllItemChecked,
  isPartialChecked,
  checked,
  dispatch,
  onDropItem
}: ListPops) => {
  const handleDragHover = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragDrop = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()

    const textHtml = e.dataTransfer.getData('text/html')

    const resultIndex = textHtml.match(/data-id="([0-9]+)/)

    if (resultIndex) {
      if (resultIndex.length > 1) {
        onDropItem(Number(resultIndex[1]))
      }
    }
  }

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
      >
        {listItems.map((item) => (
          <ListItem
            key={item.id}
            {...item}
            isChecked={checked.indexOf(item) !== -1}
            onChangeChecked={() =>
              dispatch({
                type: 'handle-toggle',
                payload: {
                  item
                }
              })
            }
          />
        ))}
      </ListItems>
    </Container>
  )
}

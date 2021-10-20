import { DragEvent } from 'react'

import { ListItemAttr } from '../../@types'
import { RadioInput } from '../form'
import { ListItem } from './list-item'
import { Container, Header, ListItems } from './styles'

type ListPops = {
  header: string
  listItems: ListItemAttr[]
  maxHeight: string | number
  isAllItemChecked: boolean
  isPartialChecked: boolean
  onRequestToggleAll: () => void
  handleToggle: (item: ListItemAttr) => void
  checked: ListItemAttr[]
  onTransferItem: (id: number) => void
}

export const List = ({
  header,
  listItems,
  isAllItemChecked,
  isPartialChecked,
  onRequestToggleAll,
  checked,
  handleToggle,
  onTransferItem
}: ListPops) => {
  const handleDragHover = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragDrop = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()

    const textHtml = e.dataTransfer.getData('text/html')

    const element = document.createElement('div')
    element.innerHTML = textHtml

    const labelElement = element.querySelector('label')

    const id = labelElement?.getAttribute('data-id')

    if (id) onTransferItem(Number(id))
  }

  return (
    <Container>
      <Header>
        <RadioInput
          isAllChecked={isAllItemChecked}
          isPartialChecked={isPartialChecked}
          onClick={onRequestToggleAll}
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
            onChangeChecked={() => handleToggle(item)}
          />
        ))}
      </ListItems>
    </Container>
  )
}

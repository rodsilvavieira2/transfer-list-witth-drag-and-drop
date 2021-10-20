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
}

export const List = ({
  header,
  listItems,
  isAllItemChecked,
  isPartialChecked,
  onRequestToggleAll,
  checked,
  handleToggle
}: ListPops) => {
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

      <ListItems role="list">
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

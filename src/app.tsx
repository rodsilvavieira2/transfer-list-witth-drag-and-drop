import { useCallback, useState } from 'react'
import { ListItemAttr } from './@types'
import { List, Container, ListContainer } from './components'
import { Controllers } from './components/controllers'

const listItem = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  text: `list item ${index + 1}`,
  isChecked: false
}))

const not = (a: ListItemAttr[], b: ListItemAttr[]) => {
  return a.filter((value) => b.indexOf(value) === -1)
}

const intersection = (a: ListItemAttr[], b: ListItemAttr[]) => {
  return a.filter((value) => b.indexOf(value) !== -1)
}

const union = (a: ListItemAttr[], b: ListItemAttr[]) => {
  return [...a, ...not(b, a)]
}

export const App = () => {
  const [checked, setChecked] = useState<ListItemAttr[]>([])
  const [left, setLeft] = useState<ListItemAttr[]>(listItem)
  const [right, setRight] = useState<ListItemAttr[]>([])

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = useCallback(
    (item: ListItemAttr) => {
      const currentIndex = checked.indexOf(item)

      const newChecked = [...checked]

      if (currentIndex === -1) {
        newChecked.push(item)
      } else {
        newChecked.slice(currentIndex, 1)
      }

      setChecked(newChecked)
    },
    [checked]
  )

  const numberOfChecked = useCallback(
    (items: ListItemAttr[]) => {
      return intersection(checked, items).length
    },
    [checked]
  )

  const handleToggleAll = useCallback(
    (items: ListItemAttr[]) => {
      if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items))
      } else {
        setChecked(union(checked, items))
      }
    },
    [checked, numberOfChecked]
  )

  const handleCheckedRight = useCallback(() => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }, [checked, left, leftChecked, right])

  const handleCheckedLeft = useCallback(() => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }, [checked, left, right, rightChecked])

  const transferItem = (id: number, side: 'left' | 'right') => {
    if (side === 'left') {
      const itemIndex = right.findIndex((item) => item.id === id)

      const rightItem = right[itemIndex]

      setLeft([...left, rightItem])
      setRight(not(right, [rightItem]))
    } else {
      const itemIndex = left.findIndex((item) => item.id === id)

      const leftItem = left[itemIndex]

      setRight([...right, leftItem])
      setLeft(not(left, [leftItem]))
    }
  }

  return (
    <Container>
      <ListContainer>
        <List
          header="Choices"
          maxHeight={'10rem'}
          listItems={left}
          checked={checked}
          handleToggle={handleToggle}
          onRequestToggleAll={() => handleToggleAll(left)}
          onTransferItem={(id) => transferItem(id, 'left')}
          isAllItemChecked={
            numberOfChecked(left) === left.length && left.length !== 0
          }
          isPartialChecked={
            numberOfChecked(left) !== left.length && numberOfChecked(left) !== 0
          }
        />

        <Controllers
          onMoveToLeft={handleCheckedLeft}
          onMoveToRight={handleCheckedRight}
        />

        <List
          header="Chosen"
          maxHeight={'10rem'}
          listItems={right}
          checked={checked}
          handleToggle={handleToggle}
          onRequestToggleAll={() => handleToggleAll(right)}
          onTransferItem={(id) => transferItem(id, 'right')}
          isAllItemChecked={
            numberOfChecked(right) === right.length && right.length !== 0
          }
          isPartialChecked={
            numberOfChecked(right) !== right.length &&
            numberOfChecked(right) !== 0
          }
        />
      </ListContainer>
    </Container>
  )
}

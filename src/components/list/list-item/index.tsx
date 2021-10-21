import { memo, DragEvent, useState } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { Container } from './styles'

type ListItemProps = {
  id: number
  text: string
  isChecked: boolean
  onChangeChecked: () => void
  onDrop: (from: number, to: number) => void
}

const Base = ({
  isChecked,
  text,
  id,
  onChangeChecked,
  onDrop
}: ListItemProps) => {
  const [isOnDrag, setIsOnDrag] = useState(false)

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text', String(id))

    setIsOnDrag(true)
  }

  const handleDragEnd = () => {
    setIsOnDrag(false)
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent) => {
    const dragId = e.dataTransfer.getData('text')

    onDrop(Number(dragId), id)
  }

  return (
    <Container
      role="listitem"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      isOnDrag={isOnDrag}
    >
      <label>
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChangeChecked}
          />

          {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>

        <span>{text}</span>
      </label>
    </Container>
  )
}

export const ListItem = memo(Base)

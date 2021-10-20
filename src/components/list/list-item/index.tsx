import { memo, DragEvent } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { Container } from './styles'

type ListItemProps = {
  id: number
  text: string
  onChangeChecked: () => void
  isChecked: boolean
}

const Base = ({ isChecked, onChangeChecked, text, id }: ListItemProps) => {
  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML)
  }

  return (
    <Container role="listitem" draggable="true" onDragStart={handleDragStart}>
      <label data-id={id}>
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

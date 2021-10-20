import { memo } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { Container } from './styles'

type ListItemProps = {
  text: string
  onChangeChecked: (value: boolean) => void
  isChecked: boolean
}

const Base = ({
  isChecked,
  onChangeChecked,
  text
}: ListItemProps) => {
  return (
    <Container role='listitem' draggable='true' >
      <label>
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onChangeChecked(e.currentTarget.checked)}
          />

          {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>

        <span>{text}</span>
      </label>
    </Container>
  )
}

export const ListItem = memo(Base)
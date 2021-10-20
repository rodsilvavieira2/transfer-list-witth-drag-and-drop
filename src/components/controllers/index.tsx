import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { Container } from './styles'

type ControllersProps = {
  onMoveToRight: () => void
  onMoveToLeft: () => void
}

export const Controllers = ({
  onMoveToLeft,
  onMoveToRight
}: ControllersProps) => {
  return (
    <Container>
      <button
        aria-label="move all items checked for the right"
        onClick={onMoveToRight}
      >
        <MdKeyboardArrowRight />
      </button>

      <button
        aria-label="move all items checked for the left"
        onClick={onMoveToLeft}
      >
        <MdKeyboardArrowLeft />
      </button>
    </Container>
  )
}

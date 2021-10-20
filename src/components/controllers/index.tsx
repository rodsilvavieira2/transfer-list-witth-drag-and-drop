import { Dispatch } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { ListActions } from '../../reduces'
import { Container } from './styles'

type ControllersProps = {
  dispatch: Dispatch<ListActions>
}

export const Controllers = ({ dispatch }: ControllersProps) => {
  return (
    <Container>
      <button
        aria-label="move all items checked for the right"
        onClick={() =>
          dispatch({
            type: 'move-to-right'
          })
        }
      >
        <MdKeyboardArrowRight />
      </button>

      <button
        aria-label="move all items checked for the left"
        onClick={() =>
          dispatch({
            type: 'move-to-left'
          })
        }
      >
        <MdKeyboardArrowLeft />
      </button>
    </Container>
  )
}

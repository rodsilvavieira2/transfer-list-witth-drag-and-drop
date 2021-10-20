import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes
} from 'react'
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox
} from 'react-icons/md'

import { Container } from './styles'

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isAllChecked?: boolean
  isPartialChecked?: boolean
}

export const Base: ForwardRefRenderFunction<HTMLInputElement, RadioInputProps> =
  (
    {
      label = null,
      name,
      isAllChecked = false,
      isPartialChecked = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Container>
        {isPartialChecked ? (
          <MdIndeterminateCheckBox />
        ) : isAllChecked ? (
          <MdCheckBox />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}

        <input
          aria-labelledby={name}
          type="checkbox"
          name={name}
          ref={ref}
          {...rest}
        />

        <span id={name}> {label}</span>
      </Container>
    )
  }

export const RadioInput = forwardRef(Base)

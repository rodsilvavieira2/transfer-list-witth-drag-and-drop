import styled from 'styled-components'

export const Container = styled.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  height: 2rem;
  width: 2rem;
  border-radius: 2rem;

  color: ${(props) => props.theme.text.primary};

  > input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    appearance: none;
  }

  > svg {
    font-size: 1.5rem;
    fill: #fff;
    flex-shrink: 0;
  }

  span {
    display: inline-block;
    margin-left: 0.5rem;
  }
`

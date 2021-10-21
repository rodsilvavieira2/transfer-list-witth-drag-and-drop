import styled from 'styled-components'

type ContainerProps = {
  isOnDrag: boolean
}

export const Container = styled.li<ContainerProps>`
  width: 100%;

  > label {
    display: flex;
    align-items: center;
    padding: 0 1.7rem;
    width: 100%;
    min-height: 3.2rem;
    cursor: pointer;

    transition: all 0.3s;

    opacity: ${(props) => (props.isOnDrag ? '0.4' : '1')};

    > * {
      flex: 1 0 auto;
    }

    &:hover {
      background-color: #e9d8fd;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      flex-shrink: 0;
      width: 20%;

      > input {
        width: 0;
        height: 0;
        position: absolute;
        opacity: 0;
        appearance: none;
      }

      > svg {
        font-size: 1.5rem;
        fill: ${(props) => props.theme.colors.primary};
        margin-right: auto;
      }
    }

    > span {
      text-align: center;
      width: 80%;
    }
  }
`

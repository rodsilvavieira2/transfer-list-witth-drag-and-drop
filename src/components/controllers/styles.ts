import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 2rem;

  > button + button {
    margin-top: 1rem;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d6bcfa;
    border-radius: 0.3rem;
    background-color: #fff;
    cursor: pointer;

    padding: 0.5rem 1rem;

    svg {
      font-size: 1.7rem;
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 0.5rem;
  min-width: 12rem;
  color: #333;

  overflow: hidden;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 1.7rem;
  background-color: #9f7aea;
  color: #ffff;
  font-weight: 500;

  > * {
    flex: 1 0 auto;
  }

  label {
    width: 20%;
    flex-shrink: 0;
  }

  span {
    display: inline-block;
    width: 80%;
    text-align: center;
  }

  overflow: hidden;
`
type ListItemsProps = {
  isReadyToDrop: boolean
}

export const ListItems = styled.ul<ListItemsProps>`
  padding: 1rem 0;
  overflow-y: auto;

  list-style: none;

  max-height: 15rem;
  min-height: 15rem;

  scrollbar-width: thin;
  scrollbar-color: #9f7aea transparent;

  border: 2px dotted
    ${(props) => (props.isReadyToDrop ? '#9f7aea' : 'transparent')};
`

import * as React from 'react'
import {render,  screen, fireEvent} from '@testing-library/react'
import ButtonIcon from '../index';

describe('ButtonIcon', () => {
  it('ButtonIcon src icon', function () {
    const onClick = jest.fn()
   render(<ButtonIcon onClick={onClick} srcIcon= '/assets/icon/user.png'  />)
    const titleText = screen.getByTestId('buttonClick')
    expect(titleText).toBeInTheDocument()
  })

  it('should render click button', function () {
    const onClick = jest.fn()
    render(<ButtonIcon onClick={onClick} srcIcon= '/assets/icon/user.png'  />)
    const button = screen.getByTestId('buttonClick')
    fireEvent.click(button)
  })
})  
import * as React from 'react'
import {render,  screen, fireEvent} from '@testing-library/react'
import ContactFavorites from '../index';

import Router from 'next/router'
jest.mock('next/router', ()=> ({push: jest.fn()}))
  
describe('ContactFavorites', () => {
  it('ContactFavorites', function () {
   render(<ContactFavorites name="tes" id={45}  />)
    const titleText = screen.getByText('tes')
    expect(titleText).toBeInTheDocument()
  })

  it('should render click button', function () {
    render(<ContactFavorites name="tes" id={45}  />)
    const button = screen.getByTestId('profileClick')
    fireEvent.click(button)
    expect(Router.push).toHaveBeenCalledWith('/contact/detail/45')
  })
})  
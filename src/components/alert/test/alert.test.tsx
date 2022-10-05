import * as React from 'react'
import {render,  screen} from '@testing-library/react'
import Alert from '../index';

describe('Index', () => {
  it('should render without throwing an success', function () {
   render( <Alert category='success' title= 'tes' />)
    const titleText = screen.getByText('tes')
    expect(titleText).toBeInTheDocument()
  })
  it('should render without throwing an error', function () {
    render( <Alert category='danger' title= 'tes' />)
     const titleText = screen.getByText('tes')
     expect(titleText).toBeInTheDocument()
   })
})  
import * as React from 'react'
import {render,  screen, fireEvent} from '@testing-library/react'
import Cards from '../index';

describe('Cards Primary', () => {
  it('Cards src icon', function () {
   render(
   <Cards title='tes'>
        <p data-testid="test-paragraf">Tes</p>
   </Cards>)
    const titleText = screen.getByText('tes')
    expect(titleText).toBeInTheDocument()
    const TestParagraf = screen.getByTestId('test-paragraf')
    expect(TestParagraf).toBeInTheDocument()
  })
})  
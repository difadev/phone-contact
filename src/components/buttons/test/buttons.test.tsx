import * as React from 'react'
import {render,  screen, fireEvent} from '@testing-library/react'
import Buttons from '../index';

describe('Buttons Primary', () => {
  it('Buttons src icon', function () {
    const onClick = jest.fn()
   render(<Buttons category="primary" title='tes' onClick={onClick}  />)
    const titleText = screen.getByText('tes')
    expect(titleText).toBeInTheDocument()
  })
  it('Buttons Primary On Click', function () {
    const onClick = jest.fn()
   render(<Buttons category="primary" title='tes' onClick={onClick}  />)
   const button = screen.getByTestId('buttonTest')
   fireEvent.click(button)
  })
})  

describe('Buttons danger', () => {
    it('Buttons src icon', function () {
      const onClick = jest.fn()
     render(<Buttons category="danger" title='tes' onClick={onClick}  />)
      const titleText = screen.getByText('tes')
      expect(titleText).toBeInTheDocument()
    })
    it('Buttons danger On Click', function () {
      const onClick = jest.fn()
     render(<Buttons category="danger" title='tes' onClick={onClick}  />)
     const button = screen.getByTestId('buttonTest')
     fireEvent.click(button)
    })
  })  

  describe('Buttons success', () => {
    it('Buttons src icon', function () {
      const onClick = jest.fn()
     render(<Buttons category="success" title='tes' onClick={onClick}  />)
      const titleText = screen.getByText('tes')
      expect(titleText).toBeInTheDocument()
    })
    it('Buttons success On Click', function () {
      const onClick = jest.fn()
     render(<Buttons category="success" title='tes' onClick={onClick}  />)
     const button = screen.getByTestId('buttonTest')
     fireEvent.click(button)
    })
  })  

  describe('Buttons success', () => {
    it('Buttons src icon', function () {
      const onClick = jest.fn()
     render(<Buttons category="success" title='tes' onClick={onClick}  />)
      const titleText = screen.getByText('tes')
      expect(titleText).toBeInTheDocument()
    })
    it('Buttons success On Click', function () {
      const onClick = jest.fn()
     render(<Buttons category="success" title='tes' onClick={onClick}  />)
     const button = screen.getByTestId('buttonTest')
     fireEvent.click(button)
    })
  })  

  describe('Buttons default', () => {
    it('Buttons src icon', function () {
      const onClick = jest.fn()
     render(<Buttons category="default" title='tes' onClick={onClick}  />)
      const titleText = screen.getByText('tes')
      expect(titleText).toBeInTheDocument()
    })
    it('Buttons default On Click', function () {
      const onClick = jest.fn()
     render(<Buttons category="default" title='tes' onClick={onClick}  />)
     const button = screen.getByTestId('buttonTest')
     fireEvent.click(button)
    })
  })  

  describe('Buttons default else', () => {
    it('Buttons src icon', function () {
      const onClick = jest.fn()
     render(<Buttons title='tes' onClick={onClick}  />)
      const titleText = screen.getByText('tes')
      expect(titleText).toBeInTheDocument()
    })
    it('Buttons default On Click', function () {
      const onClick = jest.fn()
     render(<Buttons title='tes' onClick={onClick}  />)
     const button = screen.getByTestId('buttonTest')
     fireEvent.click(button)
    })
  })  
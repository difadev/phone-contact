import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import FormContact from '../index'
import { act } from "react-dom/test-utils";

describe('FormContact', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  useRouter.mockImplementation(() => ({
    query: { id: 45 },
  }))
  it("should FormContact On Change ", async () => {
    render(<FormContact type="add" finishSubmit={jest.fn()} />
    )
    const firstName = screen.getByTestId('firstNameTest')
    const lastName = screen.getByTestId('lastNameTest')
    const telpTest = screen.getByTestId('telpTest')
    act(() => {
      fireEvent.change(firstName,
        {
          target: {
            value: 'tes'
          }
        })
        fireEvent.change(lastName,
          {
            target: {
              value: 'tes'
            }
          })
          fireEvent.change(telpTest,
            {
              target: {
                value: '087720202'
              }
            })
      })
      expect(firstName).toHaveValue('tes')
      expect(lastName).toHaveValue('tes')
      expect(telpTest).toHaveValue('087720202')
  });
  it("should FormContact On Click Icon ", async () => {
    render(<FormContact type="add" finishSubmit={jest.fn()} />
    )
    const buttonIconTest = screen.getByTestId('buttonIconTest')
    act(() => {
      fireEvent.click(buttonIconTest)
    })
  });
  it("should FormContact On Submit ", async () => {
    render(<FormContact type="add" finishSubmit={jest.fn()} />
    )
    const buttonSubmit = screen.getByTestId('buttonSubmit')
    act(() => {
      fireEvent.click(buttonSubmit)
    })
  });

  it("should FormContact Remove ", async () => {
    const dataProps = {
      first_name:'tes',
      last_name: 'tes',
      phones:[
        {
          number:'0877202838'
        },
        {
          number:'0877202838'
        }
      ]
    }
    render(<FormContact type="add" finishSubmit={jest.fn()} dataProps={dataProps}/>
    )
    const buttonIconTest = screen.getByTestId('buttonIconTest')
    act(() => {
      fireEvent.click(buttonIconTest)
    })
  });
  it("should FormContact else ", async () => {
    const dataProps = {
      first_name:'tes',
      last_name: 'tes',
      phones:[
        {
          number:'0877202838'
        },
        {
          number:'0877202838'
        }
      ]
    }
    render(<FormContact type="edit" finishSubmit={jest.fn()} dataProps={dataProps}/>
    )
    const buttonIconTest = screen.getByTestId('lastNameTest')
    expect(buttonIconTest).toBeInTheDocument()
    const submitFormContact = screen.getByTestId('submitFormContact')
    act(() => {
      fireEvent.submit(submitFormContact)
    })
  });
})
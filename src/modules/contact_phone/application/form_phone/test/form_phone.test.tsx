import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import FormPhone from '../index'
import { act } from "react-dom/test-utils";

describe('FormPhone', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  useRouter.mockImplementation(() => ({
    query: { id: 45 },
  }))
  it("should FormPhone On Change ", async () => {
    const dataProps = '0877202838'
    render(<FormPhone type="add" finishSubmit={jest.fn()} dataProps={dataProps} />
    )
    const inputPhoneTest = screen.getByTestId('inputPhoneTest')
    act(() => {
      fireEvent.change(inputPhoneTest,
        {
          target: {
            value: '0877202838'
          }
        })
      })
      expect(inputPhoneTest).toHaveValue('0877202838')
  });

  it("should FormPhone Submit ", async () => {
    const dataProps = '0877202838'
    render(<FormPhone type="add" finishSubmit={jest.fn()} dataProps={dataProps}/>
    )
    const buttonSubmitTest = screen.getByTestId('buttonSubmitTest')
    act(() => {
      fireEvent.click(buttonSubmitTest)
    })
  });
  it("should FormPhone else ", async () => {
    const dataProps = '0877202838'
    render(<FormPhone type="edit" finishSubmit={jest.fn()} dataProps={dataProps}/>
    )
    const buttonIconTest = screen.getByTestId('inputPhoneTest')
    expect(buttonIconTest).toBeInTheDocument()
    const submitFormPhone = screen.getByTestId('submitPhone')
    act(() => {
      fireEvent.submit(submitFormPhone)
    })
  });
})
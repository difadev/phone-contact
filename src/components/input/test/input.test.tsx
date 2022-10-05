import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../index';
import {act} from 'react-dom/test-utils'

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    Controller: () => <></>,
    useForm: () => ({
        control: () => ({}),
        handleSubmit: () => jest.fn(),
        register: () => jest.fn(),
    }),
}))
describe('Input Tes', () => {
    it('Input', function () {
        const {rerender} = render(<Input
            type="numeric"
            onChange={jest.fn()}
            placeholder="tes"
            name="tes"
            id="tes"
            label="tes"
            register={jest.fn()}
            validateOptions={
                {
                    minLen: 8,
                    maxLen: 10
                }
            }
        />)
        const inputTesting = screen.getByTestId('input-testing')
        act(() => {
            fireEvent.change(inputTesting, {
                target: {
                    value: '877206719939'
                }
            })
        })
        expect(inputTesting).toHaveValue('877206719939')

        // Simulate String
        rerender(
        <Input
            type="string"
            onChange={jest.fn()}
            placeholder="tes"
            name="tes"
            id="tes"
            register={jest.fn()}
            validateOptions={
                {
                    minLen: 8,
                    maxLen: 10
                }
            }
        />
        )
        const inputTestingString = screen.getByTestId('input-testing')
        act(() => {
            fireEvent.change(inputTestingString, {
                target: {
                    value: 'tes'
                }
            })
        })
        expect(inputTestingString).toHaveValue('tes')
    })
})
describe('Input Icon Left', () => {
    it('Input Icon Left + show Error', function () {
        render(<Input
            type="text"
            onChange={jest.fn()}
            placeholder="tes"
            name="tes"
            id="tes"
            value="tes"
            iconLeft="/tes.com"
            onChangeIcon={jest.fn()}
            label="tes"
            register={jest.fn()}
            validateOptions={
                {
                    minLen: 8,
                    maxLen: 10
                }
            }
            errors
        />)
        const titleText = screen.getByTestId('labelTest')
        expect(titleText).toHaveTextContent('tes')
        const errorTest = screen.getByTestId('errorTest')
        expect(errorTest).toHaveTextContent('tes must required')
    })
})

describe('Input Icon Right', () => {
    it('Input Icon Right ', function () {
        render(<Input
            type="text"
            onChange={jest.fn()}
            placeholder="tes"
            name="tes"
            id="tes"
            value="tes"
            iconLeft="/tes.com"
            iconRight="/tes.com"
            onChangeIcon={jest.fn()}
            label="tes"
            register={jest.fn()}
            validateOptions={
                {
                    minLen: 8,
                    maxLen: 10
                }
            }
            errors
        />)
        const titleText = screen.getByTestId('labelTest')
        expect(titleText).toHaveTextContent('tes')
        const buttonIconTest = screen.getByTestId('buttonIconTest')
        act(() => {
            fireEvent.click(buttonIconTest)
        })
    })
})
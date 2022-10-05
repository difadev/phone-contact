import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from '../index';

describe('Loading Tes', () => {
    it('Loading', function () {
        render(<Loading />)
        const LoadingTesting = screen.getByTestId('textLoadingTest')
        expect(LoadingTesting).toHaveTextContent('Loading ...')
    })
})
import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import App from './App'

test('Search products', async () => {
    const { rerender, getByLabelText, getByText } = render(<App />)

    const inputElement = getByLabelText('search-text');
    const selectElement = getByLabelText('search-type');

    fireEvent.change(inputElement, {
        target: { value: 'random input' }
    })

    fireEvent.change(selectElement, {
        target: { value: 'ALL' }
    })

    expect(selectElement.value).toBe('ALL')
    expect(inputElement.value).toBe('random input')

    rerender(<App />)

    expect(getByText(/Search Results:/i)).toBeTruthy()
})

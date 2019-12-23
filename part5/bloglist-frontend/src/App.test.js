import React from 'react'
import {
    render, waitForElement, fireEvent
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('login')
        )

        const blogs = component.container.querySelectorAll('.blog-style')
        expect(blogs.length).toBe(0)

    })

    test('if user logged in, blogs are rendered', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
        }

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('create')
        )

        const blogs = component.container.querySelectorAll('.blog-style')
        expect(blogs.length).toBe(2)

    })
})
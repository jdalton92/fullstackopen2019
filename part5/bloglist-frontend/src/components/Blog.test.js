import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        likes: 10,
        user: {
            name: 'Test Username'
        }
    }
    const user = {
        username: 'Test Username',
        name: 'Test Name'
    }
    const addLikeHandler = jest.fn()
    const removeBlogHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog
                blog={blog}
                addLikeHandler={addLikeHandler}
                removeBlogHandler={removeBlogHandler}
                user={user}
            />
        )
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent(
            'Test Title' && 'Test Author'
        )
    })

    test('renders only title and author by default', () => {
        expect(component.container).not.toHaveTextContent(
            '10'
        )
    })

    test('clicking blog shows all information', () => {
        const div = component.container.querySelector('.title')
        fireEvent.click(div)
        expect(component.container).toHaveTextContent(
            '10'
        )
    })

})
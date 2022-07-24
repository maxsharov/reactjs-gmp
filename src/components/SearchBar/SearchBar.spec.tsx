import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import SearchBar from './SearchBar'

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('renders correctly', () => {
  const tree = renderer
    .create(<SearchBar />)
    .toJSON();

  expect(tree).toMatchSnapshot();
})

describe('SearchBar', () => {
  it('should show search input and button', () => {
    const { container } = render(<SearchBar />)

    expect(container.querySelector('.search')).toBeInTheDocument()
    expect(container.querySelector('.search-button')).toBeInTheDocument()
  })

  it('should run handle on button click', () => {
    const { getByText } = render(<SearchBar />)

    const button = getByText(/search/i)

    fireEvent.click(button)

    expect(mockedUsedNavigate).toBeCalledTimes(1)
  })
})


import { render, fireEvent } from '@testing-library/react'
import SearchInput from '../SearchInput'

vi.mock('../../utils/feedHistory', () => ({
  getHistory() {
    return [
      { title: 'Suggestion 1', url: 'http://suggestion1.local' },
      { title: 'Suggestion 2', url: 'http://suggestion2.local' },
      { title: 'Suggestion 3', url: 'http://suggestion3.local' },
    ]
  },
}))

const onSubmit = vi.fn()

describe('SearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render input', () => {
    const { getByTitle } = render(
      <SearchInput loading={false} onSubmit={onSubmit} />,
    )
    const input = getByTitle('RSS URL')
    expect(input).toBeTruthy()
  })

  it('should render suggestions', () => {
    const { getByTitle, getByText } = render(
      <SearchInput loading={false} onSubmit={onSubmit} />,
    )
    const input = getByTitle('RSS URL')
    fireEvent.focus(input)
    expect(getByText('Suggestion 1')).toBeTruthy()
    expect(getByText('http://suggestion3.local')).toBeTruthy()
  })

  it('should hide suggestions on blur', () => {
    const { getByTitle, queryByText } = render(
      <SearchInput loading={false} onSubmit={onSubmit} />,
    )
    const input = getByTitle('RSS URL')
    fireEvent.focus(input)
    expect(queryByText('Suggestion 1')).toBeTruthy()
    fireEvent.blur(input)
    expect(queryByText('Suggestion 1')).toBeNull()
  })

  it('should filter suggestions', () => {
    const { getByTitle, queryByText } = render(
      <SearchInput loading={false} onSubmit={onSubmit} />,
    )
    const input = getByTitle('RSS URL')
    fireEvent.focus(input)
    expect(queryByText('Suggestion 1')).toBeTruthy()
    fireEvent.change(input, { target: { value: 'suggestion2' } })
    expect(queryByText('Suggestion 1')).toBeNull()
    expect(queryByText('Suggestion 2')).toBeTruthy()
    expect(queryByText('Suggestion 3')).toBeNull()
  })

  it('should do nothing on enter with invalid value', () => {
    const { getByTitle } = render(
      <SearchInput loading={false} onSubmit={onSubmit} />,
    )
    const input = getByTitle('RSS URL')
    fireEvent.change(input, { target: { value: 'test.local' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should submit clicked suggestion', () => {
    const { getByTitle, getByText } = render(
      <SearchInput loading={false} onSubmit={onSubmit} />,
    )
    const input = getByTitle('RSS URL')
    fireEvent.focus(input)
    const suggestion = getByText('Suggestion 1')
    fireEvent.mouseDown(suggestion)
    expect(onSubmit).toHaveBeenCalledWith('http://suggestion1.local')
  })

  it('should submit selected suggestion', () => {
    const { getByTitle } = render(
      <SearchInput loading={false} onSubmit={onSubmit} />,
    )
    const input = getByTitle('RSS URL')
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledWith('http://suggestion2.local')
  })

  it('should render loader while loading', () => {
    const { queryByRole } = render(
      <SearchInput loading={true} onSubmit={onSubmit} />,
    )
    expect(queryByRole('progressbar')).toBeTruthy()
    expect(onSubmit).toBeCalledTimes(0)
  })
})

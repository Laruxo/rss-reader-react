import { render, fireEvent } from '@testing-library/react'
import { useFetch } from './hooks/useFetch'
import { addHistoryItem } from './utils/feedHistory'
import App from './App'

vi.mock('./hooks/useFetch', () => ({
  useFetch: vi
    .fn()
    .mockReturnValue({ response: null, isLoading: true, error: null }),
}))

vi.mock('./utils/feedHistory', () => ({
  getHistory: () => [
    { title: 'Suggestion 1', url: 'http://suggestion1.local' },
  ],
  addHistoryItem: vi.fn(),
}))

const feedMock: RssApiResponse = {
  feed: { title: 'Feed Title', url: '' },
  items: [
    {
      guid: '111',
      title: 'Item 1',
      pubDate: '2020-01-01',
      link: '',
      description: '',
      content: '',
    },
    {
      guid: '222',
      title: 'Item 2',
      pubDate: '2020-01-02',
      link: '',
      description: '',
      content: '',
    },
  ],
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch with first history item initially', () => {
    render(<App />)
    expect(vi.mocked(useFetch)).toBeCalledWith(
      'https://api.rss2json.com/v1/api.json?rss_url=http://suggestion1.local',
    )
  })

  it('should fetch with new url on submit', () => {
    const { getByRole, getByTitle } = render(<App />)
    fireEvent.change(getByTitle('RSS URL'), {
      target: { value: 'http://test.local' },
    })
    fireEvent.submit(getByRole('form'))
    expect(vi.mocked(useFetch)).toBeCalledWith(
      'https://api.rss2json.com/v1/api.json?rss_url=http://test.local',
    )
  })

  it('should render error', () => {
    vi.mocked(useFetch).mockReturnValue({
      error: 'Custom error',
      isLoading: false,
      response: null,
    })
    const { queryByText } = render(<App />)
    expect(queryByText('Custom error')).toBeTruthy()
  })

  it('should render feed list', () => {
    vi.mocked(useFetch).mockReturnValue({
      response: feedMock,
      isLoading: false,
      error: null,
    })
    const { queryByText, queryByRole } = render(<App />)
    expect(queryByText('Feed Title Feed')).toBeTruthy()
    expect(queryByText('Item 1')).toBeTruthy()
    expect(queryByRole('list')?.children).toHaveLength(2)
  })

  it('should add feed to history on success response', () => {
    vi.mocked(useFetch).mockReturnValue({
      response: feedMock,
      isLoading: false,
      error: null,
    })
    render(<App />)
    expect(addHistoryItem).toBeCalledWith(feedMock.feed)
  })
})

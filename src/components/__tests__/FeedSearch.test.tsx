import { fireEvent, render } from '@testing-library/react'
import { useFetch } from '../../hooks/useFetch'
import { addHistoryItem } from '../../utils/feedHistory'
import FeedSearch from '../FeedSearch'

const setResponse = vi.fn()

vi.mock('../../hooks/useFetch', () => ({ useFetch: vi.fn() }))

vi.mock('../../utils/feedHistory', () => ({
  getHistory: () => [
    { title: 'Suggestion 1', url: 'http://suggestion1.local' },
  ],
  addHistoryItem: vi.fn(),
}))

describe('<FeedSearch>', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch with first history item initially', () => {
    vi.mocked(useFetch).mockReturnValue(null)
    render(<FeedSearch setResponse={setResponse} />)
    expect(vi.mocked(useFetch)).toBeCalledWith(
      'https://api.rss2json.com/v1/api.json?rss_url=http://suggestion1.local',
    )
  })

  it('should fetch with new url on submit', () => {
    vi.mocked(useFetch).mockReturnValue(null)
    const { getByRole, getByTitle } = render(
      <FeedSearch setResponse={setResponse} />,
    )
    fireEvent.change(getByTitle('RSS URL'), {
      target: { value: 'http://test.local' },
    })
    fireEvent.submit(getByRole('form'))
    expect(vi.mocked(useFetch)).toBeCalledWith(
      'https://api.rss2json.com/v1/api.json?rss_url=http://test.local',
    )
  })

  it('should set response and render loader while loading', () => {
    vi.mocked(useFetch).mockReturnValue(null)
    const { queryByRole } = render(<FeedSearch setResponse={setResponse} />)
    expect(queryByRole('progressbar')).toBeTruthy()
    expect(setResponse).toBeCalledTimes(1)
    expect(setResponse).toBeCalledWith(null)
  })

  it('should set response and hide loader on error', () => {
    vi.mocked(useFetch).mockReturnValue({ error: 'Custom error' })
    const { queryByRole } = render(<FeedSearch setResponse={setResponse} />)
    expect(queryByRole('progressbar')).toBeNull()
    expect(setResponse).toBeCalledTimes(1)
    expect(setResponse).toBeCalledWith({ error: 'Custom error' })
  })

  it('should set response on success response', () => {
    vi.mocked(useFetch).mockReturnValue({
      feed: 'mock feed',
    } as unknown as ApiResponse)
    render(<FeedSearch setResponse={setResponse} />)
    expect(setResponse).toBeCalledTimes(1)
    expect(setResponse).toBeCalledWith({ feed: 'mock feed' })
  })

  it('should add feed to history on success response', () => {
    vi.mocked(useFetch).mockReturnValue({
      feed: 'mock feed',
    } as unknown as ApiResponse)
    render(<FeedSearch setResponse={setResponse} />)
    expect(addHistoryItem).toBeCalledWith('mock feed')
  })
})

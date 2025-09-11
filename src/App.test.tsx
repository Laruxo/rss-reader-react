import { render } from '@testing-library/react'
import { useFetch } from './hooks/useFetch'
import App from './App'

vi.mock('./hooks/useFetch', () => ({ useFetch: vi.fn() }))

describe('App', () => {
  it('should render error', () => {
    vi.mocked(useFetch).mockReturnValue({ error: 'Custom error' })
    const { queryByText } = render(<App />)
    expect(queryByText('Custom error')).toBeTruthy()
  })

  it('should render feed list', () => {
    vi.mocked(useFetch).mockReturnValue({
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
    })
    const { queryByText, queryByRole } = render(<App />)
    expect(queryByText('Feed Title Feed')).toBeTruthy()
    expect(queryByText('Item 1')).toBeTruthy()
    expect(queryByRole('list')?.children).toHaveLength(2)
  })
})

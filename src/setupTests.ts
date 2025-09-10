let storage: { [key: string]: string } = {}

global.localStorage = {
  getItem: vi.fn().mockImplementation((key: string) => storage[key]),
  setItem: vi.fn().mockImplementation((key: string, value: string) => {
    storage[key] = value
  }),
  removeItem: vi.fn().mockImplementation((key: string) => {
    delete storage[key]
  }),
  clear: vi.fn().mockImplementation(() => {
    storage = {}
  }),
  key: vi.fn(),
  length: 0,
}

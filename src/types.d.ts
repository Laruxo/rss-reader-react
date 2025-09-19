type FeedInfo = {
  title: string
  url: string
}

type FeedItem = {
  guid: string
  title: string
  pubDate: string
  link: string
  description: string
  content: string
}

type RssApiResponse = {
  feed: FeedInfo
  items: FeedItem[]
}

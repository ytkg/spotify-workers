import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { getAccessToken, getPlayingInfo } from './lib/spotify'

const app = new Hono()

app.use('/playing', cache({ cacheName: 'playing', cacheControl: 'max-age=10'}))

app.get('/playing', async (c) => {
  const accessToken = await getAccessToken(c.env.SPOTIFY_CLIENT_ID, c.env.SPOTIFY_CLIENT_SECRET, c.env.SPOTIFY_REFRESH_TOKEN)
  const playingInfo = await getPlayingInfo(accessToken)

  return c.json(playingInfo)
})

export default app

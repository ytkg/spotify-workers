import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { cors } from 'hono/cors'
import findOrCreateAccessToken from './lib/find_or_create_access_token'
import { getPlayingInfo } from './lib/spotify'

interface Env {
  DB: D1Database
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => c.redirect('https://github.com/ytkg/spotify-workers'))

app.get(
  '/playing',
  cache({ cacheName: 'playing', cacheControl: 'max-age=10'}),
  cors(),
  async (c) => {
    const accessToken = await findOrCreateAccessToken(
      c.env.DB,
      c.env.SPOTIFY_CLIENT_ID,
      c.env.SPOTIFY_CLIENT_SECRET,
      c.env.SPOTIFY_REFRESH_TOKEN
    )

    const playingInfo = await getPlayingInfo(accessToken)

    return c.json(playingInfo)
  }
)

export default app

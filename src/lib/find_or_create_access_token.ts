import { createAccessToken } from './spotify'

type Secret = {
  token: string
}

const findOrCreateAccessToken = async (db: D1Database, clientId: string, clientSecret: string, refreshToken: string) => {
  const secret = await db.prepare(
    `select * from secrets where expires_at > datetime('now')`
  ).first<Secret>()

  if (secret) {
    return secret.token
  }

  const accessToken = await createAccessToken(clientId, clientSecret, refreshToken)

  await db.prepare(`insert into secrets(token, expires_at) values (?, datetime('now', '+1 hours'))`).bind(accessToken).run()

  return accessToken
}

export default findOrCreateAccessToken

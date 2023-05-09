type TokenResponse = {
  access_token: string
}

type PlayingResponse = {
  item: Item
  is_playing: boolean
}

type Item = {
  artists: Artist[]
  album: Album
  name: string
}

type Artist = {
  name: string
}

type Album = {
  name: string
}

const createAccessToken = async (clientId: string, clientSecret: string, refreshToken: string) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })

  const { access_token: accessToken }: TokenResponse = await response.json()

  return accessToken
}

const getPlayingInfo = async (accessToken: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept-Language': 'ja'
    }
  })

  if (response.status !== 200) {
    console.log(`status: ${response.status}`)
    console.log(`body: ${await response.text()}`)

    return { isPlaying: false, artistName: null, albumName: null, trackName: null }
  }

  const { item, is_playing: isPlaying }: PlayingResponse = await response.json()

  return {
    isPlaying,
    artistName: item.artists.map((artist) => artist.name).join(', '),
    albumName: item.album.name,
    trackName: item.name,
  }
}

export { createAccessToken, getPlayingInfo }

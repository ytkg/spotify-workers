# spotify-workers

## Usage
```bash
$ curl -s https://music.takagi.dev/playing | jq
{
  "isPlaying": true,
  "artistName": "Saucy Dog",
  "albumName": "レイジーサンデー",
  "trackName": "シンデレラボーイ",
  "imageUrl": "https://i.scdn.co/image/ab67616d0000b27381b5fbf6470347967b819fe3",
  "previewUrl": "https://p.scdn.co/mp3-preview/34cf86f5a6f65900f2c456a57c41fad12aadff36?cid=1f2f34c40ba8411bbe57cdc7bd3f3632"
}
```

## Development
```bash
$ yarn start
```

## Deployment
```bash
$ yarn deploy
```

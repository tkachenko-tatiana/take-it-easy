import authInfo from 'utils/auth'
import { store } from '../index'

export default async (uri, options) => {
  const { refreshToken } = authInfo.getTokens()
  const response = await fetch(uri, options)
  console.log('resp: ', response)

  if (response.ok) {
    const json = await response.json()
    console.log('json: ', json)

    if (json.error) {
      // return fetch('/api/refresh-token', { method: 'POST', body: { refreshToken } }).then(response => {
      //   // handle response
      // })
    }

    return new Response(JSON.stringify(json))
  }

  return response
}

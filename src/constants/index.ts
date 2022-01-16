export const KP_API = 'https://kinopoiskapiunofficial.tech/api'
export const KP_HEADERS = {
  'X-API-KEY': process.env.REACT_APP_API_KP || '',
  'Content-Type': 'application/json'
}
export const CDN_API = `https://videocdn.tv/api/short?api_token=${process.env.REACT_APP_API_CDN || ''}`
export const MAIN_CATEGORIES = [
  {
    id: 1,
    name: 'Топ-100 популярных фильмов',
    url: '/v2.2/films/top?type=TOP_100_POPULAR_FILMS'
  },
  {
    id: 2,
    name: 'Топ-250 фильмов',
    url: '/v2.2/films/top?type=TOP_250_BEST_FILMS'
  }
]

export const MAIN_API = process.env.REACT_APP_MAIN_API || ''
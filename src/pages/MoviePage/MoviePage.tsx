import { FC, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { FavoriteButton } from '../../components/FavoriteButton/FavoriteButton'
import { MovieDetails } from '../../components/MovieDetails/MovieDetails'
import { MovieHeader } from '../../components/MovieHeader/MovieHeader'
import { MoviePlayer } from '../../components/MoviePlayer/MoviePlayer'
import { KP_API, KP_HEADERS } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { store } from '../../recoil'
import './MoviePage.scss'

export const MoviePage: FC = () => {
  const { id } = useParams()
  const { response } = useFetch(`${KP_API}/v2.2/films/${id}`, {
    headers: KP_HEADERS
  })

  const [state, setState] = useRecoilState(store)

  useEffect(() => {
    if (response) {
      document.title = response.nameRu || response.nameEn || response.nameOriginal
    }
  }, [response])

  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className='MoviePage' ref={ref}>
      <div className='MoviePage__Wrap'>
        <MovieHeader filmId={id} {...response} />
        {state.isAuth && <FavoriteButton filmId={id!} {...response} />}
        <div className='MoviePage__Content'>
          <MovieDetails {...response} />
        </div>
        {response && <div className='MoviePage__Player'>{id && <MoviePlayer nameEn={response.nameEn} nameRu={response.nameRu} nameOriginal={response.nameEn} year={response.year} filmLength={response.filmLength} id={id} cover={response.posterUrl} coverPreview={response.posterUrlPreview} filmId={response.kinopoiskId}/>}</div>}
      </div>
    </div>
  )
}

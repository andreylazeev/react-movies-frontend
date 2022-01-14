import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { MovieDetails } from '../../components/MovieDetails/MovieDetails'
import { MovieHeader } from '../../components/MovieHeader/MovieHeader'
import { KP_API, KP_HEADERS } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import './MoviePage.scss'

export const MoviePage: FC = () => {
  const {id} = useParams()
  const {response} = useFetch(`${KP_API}/v2.2/films/${id}`, {
    headers: KP_HEADERS
  })
  
  return (
    <div className='MoviePage'>
      <MovieHeader filmId={id} {...response}/>
      <div className="MoviePage__Content">
        <MovieDetails {...response}/>
      </div>
    </div>
  )
}

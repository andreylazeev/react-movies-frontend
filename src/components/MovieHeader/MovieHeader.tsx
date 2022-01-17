import { FC, memo } from 'react'
import { KP_HEADERS } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { MovieProps } from '../../interfaces'
import './MovieHeader.scss'

export const MovieHeader: FC<MovieProps> = memo(({filmId, nameRu, nameEn, nameOriginal, posterUrlPreview}) => {
  const { response } = useFetch<MovieProps>(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/images?type=STILL&page=1`,
    {
      headers: KP_HEADERS
    }
  )
  if (response) {
    return (
      <div className='MoviePage__Header' style={{background: response.items.length ? `url(${response.items[Math.floor(Math.random()*response.items.length)].imageUrl})` : 'black'}}>
        <div className="MoviePage__Info">
          <img src={posterUrlPreview} className='MoviePage__Poster' alt={nameRu || nameEn} />
          <h2 className='MoviePage__Title'>{nameRu || nameEn || nameOriginal}</h2>
        </div>
      </div>
    )
  }

  else return <div></div>
}
)
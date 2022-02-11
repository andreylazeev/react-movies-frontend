import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { KP_HEADERS } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { MovieProps } from '../../interfaces'

import './MainSlide.scss'

export const MainSlide: FC<MovieProps> = ({
  posterUrlPreview,
  genres,
  nameRu,
  nameEn,
  filmId,
  rating
}) => {
  const { response } = useFetch<MovieProps>(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/images?type=STILL&page=1`,
    {
      headers: KP_HEADERS
    }
  )

  return (
    <Link to={`/watch/${filmId}`}>
      {response && (
        <div
          className='MainSlide'
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.25) 100%),url(${response.items.length ? response.items[0].imageUrl : ''})`
          }}
        >
          <span className="MainSlide__Rating">
            {rating}
          </span>
          <div className='MainSlide__Info'>
            <img className='MainSlide__Poster' alt={nameEn || nameRu} src={posterUrlPreview} />
            <div>
              <h2 className='MainSlide__Title'>{nameRu || nameEn}</h2>
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}

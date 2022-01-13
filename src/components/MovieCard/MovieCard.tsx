import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { MovieProps } from '../../interfaces'
import './MovieCard.scss'

export const MovieCard: FC<MovieProps> = memo(
  ({ filmId, posterUrlPreview, nameRu, nameEn, rating }) => {
    return (
      <Link
        to={`/watch/${filmId}`}
        style={{ backgroundImage: `url(${posterUrlPreview})` }}
        className='Movie__Card'
        title={nameRu || nameEn}
      >
        <p className='Movie__Rating'>{rating}</p>
        <p className='Movie__Title'>{nameRu || nameEn}</p>
      </Link>
    )
  }
)

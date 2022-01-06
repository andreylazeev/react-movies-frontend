import { FC } from 'react'
import { Link } from 'react-router-dom'
import { MovieProps } from '../../interfaces'
import './SearchResultsCard.scss'

export const SearchResultsCard: FC<MovieProps> = ({
  posterUrlPreview,
  genres,
  nameRu,
  nameEn,
  filmId,
  rating
}) => {
  return <Link to={`/watch/${filmId}`} className='SearchResults__Card'>
    <div className="SearchResults__Image">
      <img src={posterUrlPreview} alt={nameEn} />
    </div>
    <div className="SearchResults__Info">
    <p className='SearchResults__Title'>{nameRu || nameEn}</p>
    <p className="SearchResults__Genres">{genres?.map((genre: {[key: string] : string}) => genre.genre).join(', ')}</p>
    </div>
  </Link>
}

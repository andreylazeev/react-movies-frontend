import { FC } from 'react'
import { SearchResultsCardProps } from '../../interfaces'

export const SearchResultsCard: FC<SearchResultsCardProps> = ({
  posterUrlPreview,
  genres,
  nameRu,
  nameEn,
  rating
}) => {
  return <div className='SearchResults__Card'>
    <img src={posterUrlPreview} alt={nameEn} />
  </div>
}

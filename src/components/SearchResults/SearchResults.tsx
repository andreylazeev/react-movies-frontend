import { FC, Ref, forwardRef, useState } from 'react'
import { KP_API, KP_HEADERS } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { MovieProps } from '../../interfaces'
import { SearchResultsCard } from '../SearchResultsCard/SearchResultsCard'
import './SearchResults.scss'

interface SearchResultsProps {
  query: string,
  ref: Ref<any>,
  [key: string]: any
}
  export const SearchResults: FC<SearchResultsProps> = forwardRef(({ query, onMovieClick }, ref) => {
  const {response} = useFetch<MovieProps>(KP_API + '/v2.1/films/search-by-keyword?' + new URLSearchParams({keyword: query}), {headers: KP_HEADERS})
  
  return <div ref={ref} className='SearchResults'>
    {response &&
      response.films.slice(0,5).map((film: MovieProps) => <SearchResultsCard onClick={onMovieClick} key={film.filmId} {...film} />)
    }
  </div>
})

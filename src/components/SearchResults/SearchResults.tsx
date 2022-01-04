import { FC, useEffect, useState } from 'react'
import { KP_API } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { SearchResultsCardProps } from '../../interfaces'
import { SearchResultsCard } from '../SearchResultsCard/SearchResultsCard'
import './SearchResults.scss'

interface SearchResultsProps {
  query: string
}

export const SearchResults: FC<SearchResultsProps> = ({ query }) => {
  let {response} = useFetch<SearchResultsCardProps>(KP_API + '/v2.1/films/search-by-keyword?' + new URLSearchParams({keyword: query}), {headers: {'X-API-KEY' : process.env.REACT_APP_API_KP, 'Content-Type' : 'application/json'}})
  // const [isVisible, setIsVisible] = useState(false)
  return <div className='SearchResults'>
    {response &&
      response.films.slice(0,5).map((film: any) => <SearchResultsCard key={film.filmId} {...film} />)
    }
  </div>
}

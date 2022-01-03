import { FC, useEffect } from 'react'
import { KP_API } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { SearchResultsCardProps } from '../../interfaces'
import { SearchResultsCard } from '../SearchResultsCard/SearchResultsCard'

interface SearchResultsProps {
  query: string
}

export const SearchResults: FC<SearchResultsProps> = ({ query }) => {
  const {response, error, fetchData} = useFetch<SearchResultsCardProps>(KP_API + '/v2.1/films/search-by-keyword?' + new URLSearchParams({keyword: query}), {headers: {'X-API-KEY' : process.env.REACT_APP_API_KP, 'Content-Type' : 'application/json'}})
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
  return <div className='SearchResults'>
    {!error && response && 
      response.films.map((film: any) => <SearchResultsCard posterUrlPreview={film.posterUrlPreview} />)
    }
  </div>
}

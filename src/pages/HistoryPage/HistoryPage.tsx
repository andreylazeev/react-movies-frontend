import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { Dictionary } from '../../interfaces'
import { MoviesState } from '../../recoil'
import './HistoryPage.scss'

export const HistoryPage: FC = () => {
  useEffect(() => {
    document.title = 'Избранное'
  }, [])

  const movies = useRecoilValue(MoviesState)
  return (
    <div className='HistoryPage'>
      <h1>История просмотров</h1>
      <div className="HistoryPage__Content">
      {movies && movies.map((movie: Dictionary<any>) => <MovieCard duration={movie.movieLength ? movie.getTime(movie.movieLength) : 0} filmId={movie.filmId} posterUrlPreview={movie.coverPreview} key={movie.filmId} rating={movie.rating} nameRu={movie.nameRu || ''} nameEn={movie.nameEn || ''}/>)}
      </div>
    </div>
  )
}

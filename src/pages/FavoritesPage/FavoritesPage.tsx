import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { Dictionary } from '../../interfaces'
import { favoriteMoviesState, store } from '../../recoil'
import './FavoritesPage.scss'

export const FavoritesPage: FC = () => {
  const movies = useRecoilValue(favoriteMoviesState)
  useEffect(() => {
    document.title = 'Избранное'
  }, [])

  return (
    <div className='FavoritesPage'>
      <h1>Избранное</h1>
      <div className='FavoritesPage__Content'>
        {movies &&
          movies.map((movie: Dictionary<any>) => (
            <MovieCard
              duration={movie.movieLength ? movie.getTime(movie.movieLength) : 0}
              filmId={movie.filmId}
              posterUrlPreview={movie.coverPreview}
              key={movie.filmId}
              rating={movie.rating}
              nameRu={movie.nameRu || ''}
              nameEn={movie.nameEn || ''}
            />
          ))}
      </div>
    </div>
  )
}

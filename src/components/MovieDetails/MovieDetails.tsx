import { FC } from 'react'
import { Dictionary, MovieProps } from '../../interfaces'
import './MovieDetails.scss'

export const MovieDetails: FC<MovieProps> = ({description, genres, ratingImdb, ratingKinopoisk, ratingMpaa}) => {
  return (
    <div className={`MoviePage__Details ${!description ? 'MoviePage__Details--Single' : ''}`}>
      <p className="MoviePage__Description">
        {description}
      </p>
      <div className="MoviePage__AdditionalInfo">
        {ratingKinopoisk && <div className="MoviePage__AdditionalBlock">
          <span>Рейтинг Кинопоиск</span>  
          <p className='MoviePage__Age'>{ratingKinopoisk}</p>
        </div>}
        {ratingImdb && <div className="MoviePage__AdditionalBlock">
          <span>Рейтинг IMDB</span>  
          <p className='MoviePage__Age'>{ratingImdb}</p>
        </div>}
        {genres && <div className="MoviePage__AdditionalBlock">
          <span>Жанры</span>  
          <p className='MoviePage__Genres'>{genres.map((el: Dictionary<any>) => el.genre).join(', ')}</p>
        </div>}
        {ratingMpaa && <div className="MoviePage__AdditionalBlock">
          <span>Возрастной рейтинг</span>  
          <p className='MoviePage__Age'>{ratingMpaa}</p>
        </div>}
      </div>
    </div>
  )
}

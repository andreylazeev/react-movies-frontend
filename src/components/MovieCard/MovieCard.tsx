import { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Dictionary, MovieProps } from '../../interfaces'
import { store } from '../../recoil'
import './MovieCard.scss'

export const MovieCard: FC<MovieProps> = memo(
  ({ filmId, posterUrlPreview, nameRu, nameEn, rating, duration }) => {
    const [state, setState] = useRecoilState(store)
    const [viewed, setViewed] = useState(0)
    const [length, setLength] = useState(0)
    useEffect(() => {
      if (state) {
        const candidate = state.userData?.movies?.find((el: Dictionary<any>) => el.filmId === filmId)
        if (!!candidate) {
          setViewed(candidate.viewedLength)
          setLength(candidate.filmLength)
        }
      }
    }, [state])
    return (
      <Link
        to={`/watch/${filmId}`}
        style={{ backgroundImage: `url(${posterUrlPreview})` }}
        className='Movie__Card'
        title={nameRu || nameEn}
      >
        <p className='Movie__Rating'>{rating}</p>
        <p className='Movie__Title'>{nameRu || nameEn}</p>
        {state.isAuth && viewed > 0 && (
          <div className='Movie__Progress'>
            <div
              className='Movie__Progress--Line'
              style={{ width: `${(viewed * 100) / length}%` }}
            />
          </div>
        )}
      </Link>
    )
  }
)

import { FC, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { UserController } from '../../controllers/user.controller'
import { Dictionary } from '../../interfaces'
import { store } from '../../recoil'
import './FavoriteButton.scss'
import Spinner from '../../assets/spinner.svg'

export const FavoriteButton: FC<Dictionary<any>> = ({ filmId, ...props }) => {
  const [state, setState] = useRecoilState(store)
  const [isExists, setIsExists] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const handleClick = () => {
    setIsLoading(true)
    
    const user = new UserController()
    if (!isExists) {
      user.writeMovie(
        JSON.parse(localStorage.getItem('token')!),
        {
          filmId: parseInt(filmId),
          ...props,
          viewedLength: 0,
          cover: props.posterUrl,
          isFavorite: true,
          coverPreview: props.posterUrlPreview
        },
        async () => {
          await user.getUserData(JSON.parse(localStorage.getItem('token')!), (json: any) => {
            setState((prev) => ({ ...prev, userData: json }))
            setIsFavorite(true)
            setIsLoading(false)
          })
        }
      )
    }
    if (isExists && !isFavorite) {
      user.updateMovie(
        JSON.parse(localStorage.getItem('token')!),
        { isFavorite: true, id: id },
        async () => {
          await user.getUserData(JSON.parse(localStorage.getItem('token')!), (json: any) => {
            setState((prev) => ({ ...prev, userData: json }))
            setIsLoading(false)
          })
        }
      )
    }
    if (isExists && isFavorite) {
      user.updateMovie(
        JSON.parse(localStorage.getItem('token')!),
        { isFavorite: false, id: id },
        async () => {
          await user.getUserData(JSON.parse(localStorage.getItem('token')!), (json: any) => {
            setState((prev) => ({ ...prev, userData: json }))
            setIsLoading(false)
          })
        }
      )
    }
  }

  useEffect(() => {
    setIsExists(
      state?.userData?.movies?.some((movie: Dictionary<any>) => movie.filmId === parseInt(filmId))
    )
    setIsFavorite(
      state?.userData?.movies?.some(
        (movie: Dictionary<any>) => movie.filmId === parseInt(filmId) && movie.isFavorite
      )
    )
    if (isExists) {
      setId(
        state?.userData?.movies?.find((movie: Dictionary<any>) => movie.filmId === parseInt(filmId))
          .id
      )
    }
  }, [state, isExists, id])

  return (
    <div className='FavoriteButton'>
      <button onClick={handleClick}>
        {!isLoading && (isExists && isFavorite ? 'В избранном' : 'Добавить в избранное')}
        {isLoading && <img src={Spinner} alt="loading"/>}
      </button>
    </div>
  )
}

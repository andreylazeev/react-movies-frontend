import { FC, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { UserController } from '../../controllers/user.controller'
import { Dictionary } from '../../interfaces'
import { store } from '../../recoil'
import './FavoriteButton.scss'

export const FavoriteButton: FC<Dictionary<any>> = ({filmId, ...props}) => {
  const [state, setState] = useRecoilState(store)
  const [isExists, setIsExists] = useState(false)
  const handleClick = () => {
    console.log(props);
    const user = new UserController()
    user.writeMovie(JSON.parse(localStorage.getItem('token')!), {filmId: parseInt(filmId), ...props, countries: props.countries.map((country: Dictionary<any>) => country.country),viewedLength: 0, cover: props.posterUrl, coverPreview: props.posterUrlPreview}, (() => {
      user.getUserData(JSON.parse(localStorage.getItem('token')!), (json: any) => {
        setState(prev => ({...prev, userData: json}))
      })
    }))
  }

  useEffect(() => {
    setIsExists(state?.userData?.movies?.some((movie: Dictionary<any>) => movie.filmId === parseInt(filmId)))
  }, [JSON.stringify(state)])


  return (
    <div className='FavoriteButton'>
      <button onClick={handleClick}>{isExists ? 'В избранном' : 'Добавить в избранное'}</button>
    </div>
  )
}

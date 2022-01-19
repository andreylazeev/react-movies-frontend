import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { MainList } from '../../components/MainList/MainList'
import { MainSlider } from '../../components/MainSlider/MainSlider'
import { UserController } from '../../controllers/user.controller'
import { store } from '../../recoil'
import './MainPage.scss'



export const MainPage: FC = () => {
  const [state, setState] = useRecoilState(store)

  useEffect(() => {
    document.title = 'ReactMovies'
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setState((prev) => ({...prev, isAuth: true}))
      const user = new UserController()
      user.getUserData(JSON.parse(localStorage.getItem('token')!), (json: any) => {
        setState(prev => ({...prev, userData: json}))
      })
    }
  }, [])

  return (
    <div className='MainPage'>
      <div className="MainPage__Slider">
        <MainSlider />
      </div>
      <div className="MainPage__List">
        <MainList />
      </div>
    </div>
  )
}

import { FC, useEffect } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import './Wrapper.scss'
import { Header } from '../../components/Header/Header'
import { MainPage } from '../MainPage/MainPage'
import { MoviePage } from '../MoviePage/MoviePage'
import { useRecoilState } from 'recoil'
import { store } from '../../recoil'
import { UserController } from '../../controllers/user.controller'
import { FavoritesPage } from '../FavoritesPage/FavoritesPage'
import { HistoryPage } from '../HistoryPage/HistoryPage'
export const Wrapper: FC = () => {
  const [state, setState] = useRecoilState(store)

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
    <div className='Wrapper'>
      <Navbar />
      <div className='Wrapper__Content'>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          {state.isAuth && <Route path='/history' element={<HistoryPage />} />}
          {state.isAuth && <Route path='/favorites' element={<FavoritesPage />} />}
          <Route path='/watch/:id' element={<MoviePage />} />
        </Routes>
      </div>
    </div>
  )
}

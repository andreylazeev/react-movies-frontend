import { FC, useEffect } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import './Wrapper.scss'
import { Header } from '../../components/Header/Header'
import { MainPage } from '../MainPage/MainPage'
import { MoviePage } from '../MoviePage/MoviePage'
import { useRecoilState } from 'recoil'
import { store } from '../../recoil'
export const Wrapper: FC = () => {
  const [state, setState] = useRecoilState(store)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setState((prev) => ({...prev, isAuth: true}))
    }
  }, [])
  return (
    <div className='Wrapper'>
      <Navbar />
      <div className='Wrapper__Content'>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/favorites' element={<p>favs</p>} />
          <Route path='/watch/:id' element={<MoviePage />} />
        </Routes>
      </div>
    </div>
  )
}

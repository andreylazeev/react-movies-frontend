import { FC } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import './Wrapper.scss'
import { Header } from '../../components/Header/Header'
import { MainPage } from '../MainPage/MainPage'
import { MoviePage } from '../MoviePage/MoviePage'

export const Wrapper: FC = () => {
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

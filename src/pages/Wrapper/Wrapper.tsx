import { FC } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import './Wrapper.scss'
import { Header } from '../../components/Header/Header'

export const Wrapper: FC = () => {
  return (
    <div className='Wrapper'>
        <Navbar />
      <div className='Wrapper__Content'>
        <Header />
        <Routes>
          <Route path='/' element={<p>{String(window.navigator.onLine)}</p>} />
          <Route path='/favorites' element={<p>favs</p>} />
        </Routes>
      </div>
    </div>
  )
}
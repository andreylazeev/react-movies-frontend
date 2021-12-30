import { FC } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import './Wrapper.scss'

export const Wrapper: FC = () => {
  return (
    <div className='Wrapper'>
        <Navbar />
      <div className='Wrapper__Content'>
        <Routes>
          <Route path='/' element={<p>111</p>} />
          <Route path='/favorites' element={<p>favs</p>} />
        </Routes>
      </div>
    </div>
  )
}

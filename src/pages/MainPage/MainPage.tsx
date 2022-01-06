import { FC } from 'react'
import { MainSlider } from '../../components/MainSlider/MainSlider'
import './MainPage.scss'


export const MainPage: FC = () => {
  return (
    <div className='MainPage'>
      <MainSlider />
    </div>
  )
}

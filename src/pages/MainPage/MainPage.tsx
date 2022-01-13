import { FC } from 'react'
import { MainList } from '../../components/MainList/MainList'
import { MainSlider } from '../../components/MainSlider/MainSlider'
import './MainPage.scss'


export const MainPage: FC = () => {
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

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import './MainSlider.scss'
import { KP_API } from '../../constants'
import { MovieProps } from '../../interfaces'
import { useFetch } from '../../hooks/fetch.hook'
import { MainSlide } from '../MainSlide/MainSlide'

SwiperCore.use([Navigation])

export const MainSlider = () => {
  const { response } = useFetch<MovieProps>(
    KP_API + '/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1',
    { headers: { 'X-API-KEY': process.env.REACT_APP_API_KP, 'Content-Type': 'application/json' } }
  )
  return (
    <Swiper navigation={true} className='MainSlider' allowTouchMove={true}>
      {response &&
        response.films
          .slice(0, 5)
          .map((film: MovieProps) => <SwiperSlide key={film.filmId}>
            <MainSlide {...film}/>
          </SwiperSlide>)}
    </Swiper>
  )
}

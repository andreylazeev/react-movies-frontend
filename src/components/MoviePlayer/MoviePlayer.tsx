import { FC, memo, useEffect, useRef, useState } from 'react'
import { CDN_API, MAIN_API } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { Dictionary } from '../../interfaces'
import { io } from 'socket.io-client'
import { useRecoilState } from 'recoil'
import { store } from '../../recoil'
import { UserController } from '../../controllers/user.controller'
import { useDebounce } from '../../hooks/debounce.hook'
import { throttle } from '../../helpers'

interface FilmProps {
  id: string
  filmId: number
  cover: string
  coverPreview: string
  filmLength: number
  year: number
  nameRu: string
  nameEn: string
  nameOriginal: string
}

export const MoviePlayer: FC<FilmProps> = memo(
  ({ id, year, filmId, cover, coverPreview, filmLength, nameRu, nameEn, nameOriginal }) => {
    const [data, setData] = useState<Dictionary<any>>({})
    const [state, setState] = useRecoilState(store)
    const [isLoadedUpdate, setIsLoadedUpdate] = useState(true) 
    const { response } = useFetch(`${CDN_API}&kinopoisk_id=${id}`, {})
    const [current, setCurrent] = useState(0)
    const iframeRef = useRef(null)
    const user = new UserController()

    useEffect(() => {
      if (response) {
        setData({
          data: response.data[0] || null
        })
      }
    }, [response])

    useEffect(() => {
      if (state.userData.movies) {
        const candidate = state.userData.movies.some((el: Dictionary<any>) => el.filmId === filmId)
        if (!candidate) {
          user.writeMovie(
            JSON.parse(localStorage.getItem('token')!),
            {
              filmId,
              cover,
              coverPreview,
              filmLength: filmLength || 0,
              isFavorite: false,
              viewedLength: 0,
              nameEn,
              nameRu,
              nameOriginal,
              year
            },
            () => {
              user.getUserData(JSON.parse(localStorage.getItem('token')!), (json: any) => {
                setState((prev) => ({ ...prev, userData: json }))
              })
            }
          )
        }
      }
    }, [JSON.stringify(state)])

    useEffect(() => {
      const handler = throttle(function (e: MessageEvent) {
        console.log(111);
        
        if (e.data.time && e.data.duration && isLoadedUpdate) {
          const candidate = state.userData.movies.find(
            (el: Dictionary<any>) => el.filmId === filmId
          )
          setCurrent(Math.trunc(e.data.time))
          user.updateMovie(JSON.parse(localStorage.getItem('token')!), {
            id: candidate.id,
            viewedLength: parseFloat((e.data.time / 60).toFixed(2))
          })
        }
      }, 10000)
      window.addEventListener('message', handler)
      return () => {
        setIsLoadedUpdate(false)
        window.removeEventListener('message', handler)
      }
    }, [state, isLoadedUpdate])

    return (
      <div>
        {data.data && (
          <iframe
            ref={iframeRef}
            title='player'
            allowFullScreen={true}
            frameBorder={0}
            src={
              data.data.iframe_src +
              `?start_time=${
                state.userData?.movies?.find((el: Dictionary<any>) => el.filmId === filmId) ? Math.trunc(state.userData?.movies?.find((el: Dictionary<any>) => el.filmId === filmId)
                  .viewedLength * 60) : 0
              }`
            }
          />
        )}
      </div>
    )
  }
)

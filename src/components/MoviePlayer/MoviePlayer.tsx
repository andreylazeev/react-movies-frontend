import { FC, memo, useEffect, useRef, useState } from 'react'
import { CDN_API, MAIN_API } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { Dictionary } from '../../interfaces'
import { io } from 'socket.io-client'
import { useRecoilState } from 'recoil'
import { store } from '../../recoil'
import { UserController } from '../../controllers/user.controller'

export const MoviePlayer:FC<{id: string}> = memo(({id, ...filmData}) => {
  const [data, setData] = useState<Dictionary<any>>({})
  const [state, setState] = useRecoilState(store)
  const {response} = useFetch(`${CDN_API}&kinopoisk_id=${id}`, {})
  const iframeRef = useRef(null)
  const socketRef = useRef<Dictionary<any> | null>(null)

  useEffect(() => {
    if (state.isAuth && state.userData.id) {
      socketRef.current = io(MAIN_API)
      return () => {
        socketRef.current!.disconnect()
      }
    }
  }, [state])

  useEffect(() => {
    if (response) {
      setData({
        data: response.data[0] || null,
      })
    }
  }, [response])

  const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle: boolean,
      lastFn: ReturnType<typeof setTimeout>,
      lastTime: number;
    return function (this: any) {
      const context = this,
        args = arguments;
      if (!inThrottle) {
        fn.apply(context, args);
        lastTime = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFn);
        lastFn = setTimeout(() => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        }, Math.max(wait - (Date.now() - lastTime), 0));
      }
    };
  };

  useEffect(() => {
    if(iframeRef.current) {
      const ref: any = iframeRef.current
      const iframe =ref
      const origin = iframe.src.split('/', 3).join('/');
      const candidate = state.userData?.movies?.find((el: Dictionary<any>) => el.filmId === parseInt(id))
      window.addEventListener('message', function(e: MessageEvent){
        if (e.origin === origin && e.data.time && e.data.duration && state.userData.id){
          socketRef.current?.emit('time', {id: parseInt(id),time: e.data.time, userId: state.userData.id, response: filmData, uniqueId: candidate.id})
        }
      });
    }
  }, [data, state])

  return (
    <div>
      {data.data && <iframe ref={iframeRef} title='player' allowFullScreen={true} frameBorder={0} src={data.data.iframe_src}/>}
    </div>
  )
}
)
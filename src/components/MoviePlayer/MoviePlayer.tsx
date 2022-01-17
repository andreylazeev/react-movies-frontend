import { FC, useEffect, useRef, useState } from 'react'
import { CDN_API } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import { Dictionary } from '../../interfaces'

export const MoviePlayer:FC<{id: string}> = ({id}) => {
  const {response} = useFetch(`${CDN_API}&kinopoisk_id=${id}`, {})
  const [data, setData] = useState<Dictionary<any>>({})
  const iframeRef = useRef(null)

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
      window.addEventListener('message', throttle(function(e: MessageEvent){
        if (e.origin === origin && e.data.time && e.data.duration){
          console.log('прошло', e.data.time);
          console.log('длительность',e.data.duration);
        }
      }, 5000));
    }
  }, [data])

  return (
    <div>
      {data.data && <iframe ref={iframeRef} title='player' allowFullScreen={true} frameBorder={0} src={data.data.iframe_src}/>}
    </div>
  )
}

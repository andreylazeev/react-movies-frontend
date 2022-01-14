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

  useEffect(() => {
    if(iframeRef.current) {
      const ref: any = iframeRef.current
      const iframe =ref
      const origin = iframe.src.split('/', 3).join('/');
      window.addEventListener('message', function(e){
        if (e.origin === origin && e.data.time && e.data.duration){
          console.log('прошло', e.data.time);
          console.log('длительность',e.data.duration);
        }
      });
    }
  }, [data])

  return (
    <div>
      {data.data && <iframe ref={iframeRef} title='player' allowFullScreen={true} frameBorder={0} src={data.data.iframe_src}/>}
    </div>
  )
}

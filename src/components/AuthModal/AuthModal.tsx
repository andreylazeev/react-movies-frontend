import { FC, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { store } from '../../recoil'

import './AuthModal.scss'

export const AuthModal:FC = () => {
  const [state, setState] = useRecoilState(store)
  const ref = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as HTMLElement)) {
      setState(prev => ({...prev, isModalVisible: false}));
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  return (
    <div className='AuthModal' ref={ref}>
      modal
    </div>
  )
}

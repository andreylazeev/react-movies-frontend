import { FC, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useInput } from '../../hooks/input.hook'
import { store } from '../../recoil'

import './AuthModal.scss'

export const AuthModal: FC = () => {
  const [state, setState] = useRecoilState(store)
  const [currentTab, setCurrentTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const username = useInput('')
  const password = useInput('')

  const handleOutsideClick = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as HTMLElement)) {
      setState((prev) => ({ ...prev, isModalVisible: false }))
    }
  }

  const switchTabs = (value: number) => {
    setCurrentTab(value)
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  return (
    <div className='AuthModal'>
      <div className='AuthModal__Wrap' ref={ref}>
        <div className='AuthModal__Tabs'>
          <div
            className={`AuthModal__Tab ${currentTab === 0 ? 'AuthModal__Tab--Active' : ''}`}
            onClick={() => switchTabs(0)}
          >
            Вход
          </div>
          <div
            className={`AuthModal__Tab ${currentTab === 1 ? 'AuthModal__Tab--Active' : ''}`}
            onClick={() => switchTabs(1)}
          >
            Регистрация
          </div>
        </div>
        <div className='AuthModal__Inputs'>
          <input type='text' placeholder='Имя пользователя' className='AuthModal__Input' {...username} />
          <input type='text' placeholder='Пароль' className='AuthModal__Input' {...password} />
        </div>
        <div className="AuthModal__Button">
          <button className="Navbar__Login">Вход/Регистрация</button>
        </div>
      </div>
    </div>
  )
}

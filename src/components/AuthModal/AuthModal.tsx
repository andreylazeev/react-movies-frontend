import { FC, KeyboardEvent,  useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { MAIN_API } from '../../constants'
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

  const handlePress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClick(currentTab)
    }
  }

  const handleClick = async (type: number) => {
    const query = type === 0 ? '/auth/login' : '/auth/registration'
    await fetch(MAIN_API + query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((json) => {
        if (type === 0) {
          setState((prev) => ({ ...prev, isAuth: true, isModalVisible: false }))
          localStorage.setItem('user', JSON.stringify(json))
        }
        if (type === 1) {
          setState((prev) => ({ ...prev, isAuth: true, isModalVisible: false }))
          handleClick(0)
        }
      }).catch((e: any) => {
        console.log(e);
        
      })
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className='AuthModal' onKeyPress={(e) => handlePress(e)}>
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
          <input
            type='text'
            placeholder='Имя пользователя'
            className='AuthModal__Input'
            {...username}
          />
          <input type='password' placeholder='Пароль' className='AuthModal__Input' {...password} />
        </div>
        <div className='AuthModal__Button'>
          <button className='Navbar__Login' onClick={() => handleClick(currentTab)}>
            {currentTab === 0 ? 'Вход' : 'Регистрация'}
          </button>
        </div>
      </div>
    </div>
  )
}

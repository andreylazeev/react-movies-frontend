import { FC, KeyboardEvent,  useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { MAIN_API } from '../../constants'
import { UserController } from '../../controllers/user.controller'
import { useInput } from '../../hooks/input.hook'
import { store } from '../../recoil'

import './AuthModal.scss'

export const AuthModal: FC = () => {
  const [state, setState] = useRecoilState(store)
  const [currentTab, setCurrentTab] = useState('login')
  const ref = useRef<HTMLDivElement>(null)
  const username = useInput('')
  const password = useInput('')

  const handleOutsideClick = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as HTMLElement)) {
      setState((prev) => ({ ...prev, isModalVisible: false }))
    }
  }

  const switchTabs = (value: string) => {
    setCurrentTab(value)
  }

  const handlePress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClick(currentTab)
    }
  }

  const handleClick = async (type: string) => {
    await fetch(MAIN_API + `/auth/${type}`, {
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
      .then(async (json) => {
        if (type === 'login') {
          const user = new UserController()
          setState((prev) => ({ ...prev, isAuth: true, isModalVisible: false }))
          localStorage.setItem('token', JSON.stringify(json.token))
          user.getUserData(JSON.parse(localStorage.getItem('token')!), (json: any) => {
            setState(prev => ({...prev, userData: json}))
          });
          
        }
        if (type === 'registration') {
          setState((prev) => ({ ...prev, isAuth: true, isModalVisible: false }))
          handleClick('login')
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
            className={`AuthModal__Tab ${currentTab === 'login' ? 'AuthModal__Tab--Active' : ''}`}
            onClick={() => switchTabs('login')}
          >
            Вход
          </div>
          <div
            className={`AuthModal__Tab ${currentTab === 'registration' ? 'AuthModal__Tab--Active' : ''}`}
            onClick={() => switchTabs('registration')}
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
            {currentTab === 'login' ? 'Вход' : 'Регистрация'}
          </button>
        </div>
      </div>
    </div>
  )
}

import { FC, useState } from 'react'
import { Logo } from '../Logo/Logo'
import { Menu } from '../Menu/Menu'
import { NavbarLink } from '../NavbarLink/NavbarLink'
import { RiCompass4Fill, RiHeart2Fill,RiHistoryFill } from 'react-icons/ri'
import './Navbar.scss'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import { RiMenuLine } from "react-icons/ri"
import { useRecoilState } from 'recoil'
import {store} from '../../recoil'
import { AuthModal } from '../AuthModal/AuthModal'
import { UserInfo } from '../UserInfo/UserInfo'

export const Navbar: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [state, setState] = useRecoilState(store)
  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setState(prev => ({...prev, isAuth: false, userData: {}}))
    setIsVisible(!isVisible)
  }
  const toggleModal = () => {
    setState((prev) => ({...prev, isModalVisible: !prev.isModalVisible}))
  }
  return (
    <div className={`Navbar ${!isVisible ? 'Navbar--hidden' : ''}`}>
      <div className='Navbar__Head'>
        <button onClick={toggleVisible} className='Navbar__Button'>
          <RiMenuLine />
        </button>
        <Logo />
      </div>
      <div className='Navbar__Menus'>
        {state.isModalVisible && <AuthModal />}
        <Menu heading='Главная'>
          <NavbarLink heading='Обзор' link='/' onClickEvent={toggleVisible}>
            <RiCompass4Fill />
          </NavbarLink>
          <NavbarLink heading='Избранное' link='/favorites' onClickEvent={toggleVisible}>
            <RiHeart2Fill />
          </NavbarLink>
          <NavbarLink heading='История' link='/history' onClickEvent={toggleVisible}>
            <RiHistoryFill />
          </NavbarLink>
        </Menu>
        {state.isAuth && <Menu heading='Настройки'>
          <LogoutButton onClickEvent={logout}/>
        </Menu>}
      </div>
      {!state.isAuth && <button onClick={toggleModal} className="Navbar__Login">Вход/Регистрация</button>}
      {state.isAuth && state.userData.id && <UserInfo />}
    </div>
  )
}

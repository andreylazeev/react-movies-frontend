import { FC, useState } from 'react'
import { Logo } from '../Logo/Logo'
import { Menu } from '../Menu/Menu'
import { NavbarLink } from '../NavbarLink/NavbarLink'
import { RiCompass4Fill, RiHeart2Fill, RiFireFill } from 'react-icons/ri'
import './Navbar.scss'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import { RiMenuLine } from "react-icons/ri"
import { useRecoilState } from 'recoil'
import {store} from '../../recoil'
import { AuthModal } from '../AuthModal/AuthModal'

export const Navbar: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [state, setState] = useRecoilState(store)
  const toggleVisible = () => {
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
          {/* <NavbarLink heading='Топ' link='/top' onClickEvent={toggleVisible}>
            <RiFireFill />
          </NavbarLink> */}
        </Menu>
        <Menu heading='Настройки'>
          <LogoutButton onClickEvent={toggleVisible}/>
        </Menu>
      </div>
      <button onClick={toggleModal} className="Navbar__Login">Вход/Регистрация</button>
    </div>
  )
}

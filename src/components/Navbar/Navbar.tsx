import { FC, useState } from 'react'
import { Logo } from '../Logo/Logo'
import { Menu } from '../Menu/Menu'
import { NavbarLink } from '../NavbarLink/NavbarLink'
import { RiCompass4Fill, RiHeart2Fill, RiFireFill } from 'react-icons/ri'
import './Navbar.scss'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import { RiMenuLine } from "react-icons/ri"

export const Navbar: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisible = () => {
    setIsVisible(!isVisible)
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
    </div>
  )
}

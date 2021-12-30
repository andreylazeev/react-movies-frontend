import { FC } from 'react'
import { MenuProps } from '../../interfaces'
import './NavbarLink.scss'
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom'

export const NavbarLink: FC<MenuProps> = ({children, heading, link, onClickEvent}) => {
  let resolved = useResolvedPath(link!);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink end to={link!} className={isActive =>
      "NavbarLink" + (match ? " NavbarLink--active" : "")} onClick={onClickEvent}>
      {children}
      <span className='NavbarLink__Heading'>{heading}</span>
    </NavLink>
  )
}

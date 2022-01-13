import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import './Logo.scss'

export const Logo: FC = () => {
  return (
    <NavLink to="/" className='Logo'>
      <span className='red-text'>R</span>
      <span className='hide'>eact</span>
      <span className='red-text'>M</span>
      <span className='hide'>ovies</span>
    </NavLink>
  )
}

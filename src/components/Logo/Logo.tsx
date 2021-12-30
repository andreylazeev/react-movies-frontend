import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import './Logo.scss'

export const Logo: FC = () => {
  return (
    <NavLink to="/" className='Logo'>
      <span className='red-text'>D</span>
      <span className='hide'>ungeon</span>
      <span className='red-text'>M</span>
      <span className='hide'>ovies</span>
    </NavLink>
  )
}

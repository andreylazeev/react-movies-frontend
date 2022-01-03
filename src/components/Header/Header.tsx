import { FC } from 'react'
import { Search } from '../Search/Search'
import './Header.scss'

export const Header: FC = () => {
  return (
    <div className='Header'>
      <Search />
    </div>
  )
}

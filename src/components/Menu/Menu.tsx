import { FC } from 'react'
import { MenuProps } from '../../interfaces'
import './Menu.scss'


export const Menu: FC<MenuProps> = ({heading, children}) => {
  return (
    <div className='Menu'>
      <span className="Menu__Heading">{heading}</span>
      <div className="Menu__Navigation">
        {children}
      </div>
    </div>
  )
}

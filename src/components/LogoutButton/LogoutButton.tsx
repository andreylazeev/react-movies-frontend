import { FC } from 'react'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import './Logout.scss'

interface LogoutProps {
  onClickEvent? : () => void
}

export const LogoutButton: FC<LogoutProps> = ({onClickEvent}) => {
  return (
    <div className='Logout' onClick={onClickEvent}>
      <RiLogoutBoxRLine />
      <span className='Logout__Heading'>Выход</span>
    </div>
  )
}

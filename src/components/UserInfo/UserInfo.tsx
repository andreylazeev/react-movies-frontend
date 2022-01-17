import {FC} from 'react'
import { useRecoilState } from 'recoil'
import { store } from '../../recoil'
import './UserInfo.scss'

export const UserInfo:FC = () => {
  const [state, setState] = useRecoilState(store)
  return (
    <div className='UserInfo'>
      <div className="UserInfo__Avatar">
        {state.userData.avatar ? <img src={state.userData.avatar} alt='user avatar' /> : <p>{state.userData.username[0]}</p>}
      </div>
      <div className="UserInfo__Details">
        <div className="UserInfo__UserName">
          {state.userData.username}
        </div>
      </div>
    </div>
  )
}

import { atom } from 'recoil';
import { Dictionary } from '../interfaces'

export const store = atom({
  key: 'userState',
  default: {
    isModalVisible: false,
    isAuth: false,
    userData: {} as Dictionary<any>
  }
})
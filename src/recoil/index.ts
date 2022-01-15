import { atom } from 'recoil';

export const store = atom({
  key: 'userState',
  default: {
    isModalVisible: false,
    isAuth: false,
    userData: {}
  }
})
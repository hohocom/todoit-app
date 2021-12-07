import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default : {
    id: null,
    email: '',
    nickname: '',
    originImage: '',
    thumbnailImage: '',
    workspaces: []
  }
})
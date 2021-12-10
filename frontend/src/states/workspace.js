import { atom } from 'recoil'

export const workspaceDetailState = atom({
  key: 'workspaceDetailState',
  default: {
    id: '',
    name: '',
    code: '',
    users: [],
    works: [],
    socketRef: null,
  },
})

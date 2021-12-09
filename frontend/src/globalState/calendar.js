import { atom } from 'recoil'

export const createCalendarState = atom({
  key: 'createCalendarState',
  default: false,
})

export const showCalendarState = atom({
  key: 'showCalendarState',
  default: false,
})

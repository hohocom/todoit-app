import { atom } from "recoil";

export const toastState = atom({
  key: "toastState",
  default: {
    open: false,
    second: 2000,
    type: "SUCCESS",
    message: "",
  },
});

export const emojiToastState = atom({
  key: "emojiToastState",
  default: {
    open: false,
    second: 1000,
    type: "HAPPY",
    message: "",
  },
});

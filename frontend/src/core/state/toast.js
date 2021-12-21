import { atom } from "recoil";

export const emojiToastState = atom({
  key: "emojiToastState",
  default: {
    open: false,
    second: 1000,
    type: "HAPPY",
    message: "",
  },
});

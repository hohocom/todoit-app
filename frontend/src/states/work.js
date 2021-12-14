import { atom } from "recoil";

export const worksShowModalState = atom({
  key: "worksShowModalState",
  default: false,
});

export const workCreateModalState = atom({
  key: "workCreateModalState",
  default: false,
});

export const workDetailState = atom({
  key: "workDetailState",
  default: {
    id: "",
    title: "",
    content: "",
    start: "",
    end: "",
    color: "",
    isFinished: "",
    users: []
  }
})
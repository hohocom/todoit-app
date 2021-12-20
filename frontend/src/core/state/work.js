import { atom } from "recoil";

export const workFormModalState = atom({
  key: "workFormModalState",
  default: {
    isOpen: false,
    id: "",
    title: "",
    content: "",
    themeColor: "#E5E7EB",
    workers: [],
  },
});

export const workDetailModalState = atom({
  key: "workDetailModalState",
  default: {
    isOpen: false,
  },
});

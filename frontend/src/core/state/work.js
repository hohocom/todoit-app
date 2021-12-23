import { addDays } from "date-fns";
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

export const workFormDateState = atom({
  key: "workFormDateState",
  default: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ],
});

export const workDetailModalState = atom({
  key: "workDetailModalState",
  default: {
    isOpen: false,
    id: "",
    workId: "",
    title: "",
    content: "",
    themeColor: "#E5E7EB",
    isFinished: 0,
    workers: [],
    createdAt: "",
    startDate: "",
    endDate: "",
  },
});

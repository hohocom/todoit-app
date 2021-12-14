import { atom } from "recoil";

export const workspaceUIState = atom({
  key: "workspaceUIState",
  default: {
    leftSideOpen: true,
    rightSideOpen: true,
    message: "오늘도 화이팅하세요!",
  },
});

export const workspaceDetailState = atom({
  key: "workspaceDetailState",
  default: {
    id: "",
    name: "",
    code: "",
    users: [],
    works: [],
  },
});

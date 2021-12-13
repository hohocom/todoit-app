import { atom } from "recoil";

export const workspaceUIState = atom({
  key: "workspaceUIState",
  default: {
    leftSideOpen: true,
    rightSideOpen: true,
  }
})

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

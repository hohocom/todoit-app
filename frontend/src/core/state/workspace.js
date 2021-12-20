import { atom } from "recoil";

export const workspaceUIState = atom({
  key: "workspaceUIState",
  default: {
    menus: [
      {
        id: 1,
        title: "일정 관리",
        url: "",
        icon: <i className="fab fa-bandcamp text-xl  mr-0.5"></i>,
      },
    ],
    leftSideOpen: true,
    rightSideOpen: true,
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

/* eslint-disable react-hooks/exhaustive-deps */
import { workspaceDetailState, workspaceUIState } from "core/state";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export function useNavChange() {
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const [workspaceUI, setWorksaceUI] = useRecoilState(workspaceUIState);

  useEffect(() => {
    setWorksaceUI({
      ...workspaceUI,
      menus: [
        {
          id: 1,
          title: "일정 관리",
          url: `/workspaces/${workspaceDetail.code}`,
          icon: <i className="fab fa-bandcamp text-xl  mr-0.5"></i>,
        },
        {
          id: 2,
          title: "인사 관리",
          url: `/workspaces/${workspaceDetail.code}/members`,
          icon: <i className="text-xl fas fa-address-card "></i>,
        },
      ],
    });
  }, [workspaceDetail.code]);

  const changeMenu = (index) => {
    const menu = {
      id: index,
    };
    window.localStorage.setItem("workspaceMenuIndex", JSON.stringify(menu));
  };

  const getMenuIndex = () => {
    const workspaceMenuIndexString =
      window.localStorage.getItem("workspaceMenuIndex");
    const { id } = JSON.parse(workspaceMenuIndexString);
    return id;
  };

  return { workspaceUI, changeMenu, getMenuIndex };
}

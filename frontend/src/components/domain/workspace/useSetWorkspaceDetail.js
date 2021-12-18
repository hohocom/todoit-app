/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "states/user";
import { workspaceDetailState } from "states/workspace";
import { apiScaffold } from "utils/apis";

function useSetWorkspaceDetail() {
  const location = useLocation();
  const [workspaceDetail, setWorkspaceDetail] =
    useRecoilState(workspaceDetailState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.debug("set Detail")
    if (user.id && !workspaceDetail.id) {
      console.debug("워크스페이스 디테일");
      getMatchWorkspace();
    }
  }, [user]);

  const getMatchWorkspace = async () => {
    const workspaceCode = location.pathname.split("workspaces/")[1];
    const { users } = await apiScaffold({
      method: "GET",
      url: `/users?workspaceCode=${workspaceCode}`,
    });
    console.debug(users);
    user.workspaces.forEach((workspace) => {
      console.debug(workspace);
      if (workspace.code === workspaceCode) {
        setWorkspaceDetail({
          ...workspaceDetail,
          id: workspace.id,
          code: workspace.code,
          name: workspace.name,
          users: users,
        });
      }
    });
  };
}

export default useSetWorkspaceDetail;

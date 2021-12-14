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
    if (user.id && !workspaceDetail.id) {
      console.debug("워크스페이스 디테일");
      getMathWorkspace();
    }
  }, [user]);

  const getMathWorkspace = async () => {
    const workspaceCode = location.pathname.split("workspaces/")[1];
    const res = await apiScaffold({
      method: "GET",
      url: "/users?workspaceId=1",
    });
    console.debug(res);
    user.workspaces.forEach((workspace) => {
      console.debug(workspace);
      if (workspace.code === workspaceCode) {
        setWorkspaceDetail({
          ...workspaceDetail,
          id: workspace.id,
          code: workspace.code,
          name: workspace.name,
        });
      }
    });
  };
}

export default useSetWorkspaceDetail;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, workspaceDetailState } from "core/state";
import customAxios from "core/api";
import { useLocation } from "react-router-dom";

export function useWorkspace() {
  const [user, setUser] = useRecoilState(userState);

  // 워크스페이스 생성
  const store = async () => {
    const workspaceName = window.prompt("워크스페이스 이름을 작성해주세요.");
    if (!workspaceName) return false;

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("name", workspaceName);

    const res = await customAxios({
      method: "post",
      url: "/workspaces",
      data: formData,
    });
    console.debug(res);

    setUser({
      ...user,
      workspaces: res.workspaces,
    });
  };

  // 워크스페이스 삭제
  const destroy = async (workspaceId) => {
    const result = window.prompt(
      "워크스페이스를 삭제하려면 'DELETE'를 입력해주세요"
    );
    const rightAnswer = "DELETE";
    if (result !== rightAnswer) return false;

    await customAxios({
      method: "delete",
      url: `/workspaces/${workspaceId}?userId=${user.id}`,
    });

    const newWorkspaces = user.workspaces.filter(
      (workspace) => workspace.id !== workspaceId
    );
    setUser({
      ...user,
      workspaces: newWorkspaces,
    });
  };

  return {
    store,
    destroy,
  };
}

export function useSetWorkspaceDetail() {
  const location = useLocation();
  const [workspaceDetail, setWorkspaceDetail] =
    useRecoilState(workspaceDetailState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    // 유저 아이디가 존재하고 워크스페이스 디테일 아이디가 없을 때
    if (user.id && !workspaceDetail.id) {
      console.debug("%c[워크스페이스 디테일 상태 변경]", "color:blue");
      getMatchWorkspace();
    }
  }, [user]);

  const getMatchWorkspace = async () => {
    let workspaceCode = location.pathname.split("workspaces/")[1];
    if (workspaceCode.includes("/"))
      workspaceCode = workspaceCode.split("/")[0];

    console.debug("%c[Path에서 워크스페이스 코드 추출]", "color:gray");
    console.debug(workspaceCode);

    const { users } = await customAxios({
      method: "GET",
      url: `/users?workspaceCode=${workspaceCode}`,
    });

    console.debug("%c[워크스페이스 디테일 데이터 바인딩]", "color:orange");

    user.workspaces.forEach((workspace) => {
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

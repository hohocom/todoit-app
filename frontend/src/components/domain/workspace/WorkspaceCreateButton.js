import { useRecoilState } from "recoil";
import { apiScaffold } from "utils/apis";
import { userState } from "states/user";

import createImg from "assets/images/workspaces_create.png";

function WorkspaceCreateButton() {
  const [user, setUser] = useRecoilState(userState);

  const submitWorkspace = async () => {
    const workspaceName = window.prompt("워크스페이스 이름을 작성해주세요.");
    if (!workspaceName) return false;
    
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("name", workspaceName);

    const res = await apiScaffold({
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

  return (
    <button
      className="w-1/2 p-2 ml-2 text-xl bg-gray-100 border rounded-lg"
      onClick={submitWorkspace}
    >
      <img src={createImg} alt="img" />
      <div>워크스페이스 생성</div>
    </button>
  );
}

export default WorkspaceCreateButton;

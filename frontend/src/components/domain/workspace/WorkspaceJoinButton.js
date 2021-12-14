import { useRecoilState } from "recoil";
import { userState } from "states/user";
import { apiScaffold } from "utils/apis";
import joinImg from "assets/images/workspaces_join.png";

function WorkspaceJoinButton() {
  const [user, setUser] = useRecoilState(userState);

  const submitWorkspace = async () => {
    const workspaceCode = window.prompt("초대코드를 입력해주세요. ✨");
    if (!workspaceCode) return false;

    const formData = new FormData();
    formData.append("workspaceCode", workspaceCode);
    formData.append("joinUserId", user.id);

    const res = await apiScaffold({
      method: "post",
      url: "/workspaces/invite",
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
      className="w-1/2 p-2 mr-2 text-xl text-white bg-[#FFC35E] rounded-lg"
      onClick={submitWorkspace}
    >
      <img src={joinImg} alt="img" />
      <div>초대코드로 가입</div>
    </button>
  );
}

export default WorkspaceJoinButton;

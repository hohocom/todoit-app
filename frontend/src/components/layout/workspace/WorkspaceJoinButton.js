import joinImg from "assets/images/workspaces_join.png";
import { useWorkspace } from "core/hook";

function WorkspaceJoinButton() {
  const { join } = useWorkspace();
  return (
    <button
      className="w-1/2 p-2 mr-2 text-xl text-white bg-[#FFC35E] rounded-lg"
      onClick={join}
    >
      <img src={joinImg} alt="img" />
      <div>초대코드로 가입</div>
    </button>
  );
}

export default WorkspaceJoinButton;

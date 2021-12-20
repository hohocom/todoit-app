import createImg from "assets/images/workspaces_create.png";
import { useWorkspace } from "core/hook";

function WorkspaceCreateButton() {
  const { store } = useWorkspace();
  return (
    <button
      className="w-1/2 p-2 ml-2 text-xl bg-gray-100 border rounded-lg"
      onClick={store}
    >
      <img src={createImg} alt="img" />
      <div>워크스페이스 생성</div>
    </button>
  );
}

export default WorkspaceCreateButton;

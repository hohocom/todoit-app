import { useWorkspace } from "core/hook";

function WorkspaceUpdateButton({ workspace }) {
  const { edit } = useWorkspace();
  return (
    <i
      className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"
      onClick={() => edit(workspace)}
    ></i>
  );
}

export default WorkspaceUpdateButton;

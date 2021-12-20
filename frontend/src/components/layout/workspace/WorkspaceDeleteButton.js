import { useWorkspace } from "core/hook";

function WorkspaceDeleteButton({ workspace }) {
  const { destroy } = useWorkspace();
  return (
    <i
      className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"
      onClick={() => destroy(workspace.id)}
    ></i>
  );
}

export default WorkspaceDeleteButton;

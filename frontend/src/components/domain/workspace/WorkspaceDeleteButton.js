import { apiScaffold } from "utils/apis";

function WorkspaceDeleteButton({ workspace, setUser, user }) {
  const deleteWorkspace = async (workspaceId) => {
    const result = window.prompt(
      "워크스페이스를 삭제하려면 'DELETE'를 입력해주세요"
    );
    const rightAnswer = "DELETE";
    if (result !== rightAnswer) return false;

    await apiScaffold({
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

  return (
    <i
      className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"
      onClick={() => deleteWorkspace(workspace.id)}
    ></i>
  );
}

export default WorkspaceDeleteButton;

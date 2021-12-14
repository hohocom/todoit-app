import { apiScaffold } from "utils/apis";

function WorkspaceUpdateButton({ workspace, setUser, user }) {
  const updateWorkspaceName = async (workspace) => {
    const workspaceName = window.prompt(
      "수정할 워크스페이스 이름을 입력해주세요.",
      workspace.name
    );
    if (!workspaceName) return false;

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("workspaceName", workspaceName);

    await apiScaffold({
      method: "put",
      url: `/workspaces/${workspace.id}`,
      data: formData,
    });

    const newWorkspaces = user.workspaces.map((w) => {
      if (w.id === workspace.id) return { ...w, name: workspaceName };
      else return w;
    });

    setUser({
      ...user,
      workspaces: newWorkspaces,
    });
  };

  return (
    <i
      className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"
      onClick={() => updateWorkspaceName(workspace)}
    ></i>
  );
}

export default WorkspaceUpdateButton;

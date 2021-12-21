import { useWork, useWorkspace } from "core/hook";

function WorkerSelector() {
  const { workspaceDetail } = useWorkspace();
  const { setWorkFormModal } = useWork();
  return (
    <div className="w-full">
      <select className="p-2 border rounded-md cursor-pointer">
        {workspaceDetail.users.map((user) => {
          return (
            <option
              value={user.id}
              key={user.id}
              onClick={() => {
                console.debug(user);
              }}
            >
              {user.nickname}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default WorkerSelector;

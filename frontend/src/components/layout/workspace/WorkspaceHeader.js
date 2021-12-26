import { AvatarGroup } from "components/common";
import { workspaceDetailState } from "core/state";
import { useRecoilValue } from "recoil";

function WorkspaceHeader() {
  const workspaceDetail = useRecoilValue(workspaceDetailState);

  return (
    <header className="w-full h-[60px] border-b flex justify-between items-center p-4">
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-apple-regular">{workspaceDetail.name}</h2>
      </div>
      <div className="flex items-center justify-center">
        <AvatarGroup users={workspaceDetail.users} />
      </div>
    </header>
  );
}

export default WorkspaceHeader;

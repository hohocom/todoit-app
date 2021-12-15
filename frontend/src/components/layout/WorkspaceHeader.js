import AvatarGroup from "components/shared/AvatarGroup";
import { useRecoilValue } from "recoil";
import { workspaceDetailState } from "states/workspace";

function WorkspaceHeader() {
  const workspaceDetail = useRecoilValue(workspaceDetailState);

  return (
    <header className="w-full h-[60px] border-b flex justify-between items-center p-4">
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-apple-regular">{workspaceDetail.name}</h2>
      </div>

      <div className="flex items-center justify-center">
        <button className="px-4 pt-2 py-1 bg-[#ffac5ef3] rounded-md mr-3 text-white ring-2 ring-white hover:ring-red-200">Invite</button>
        <AvatarGroup items={workspaceDetail.users} />
      </div>
    </header>
  );
}

export default WorkspaceHeader;

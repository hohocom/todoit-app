import AvatarGroup from "components/shared/AvatarGroup";
import bgImg from "assets/images/bg.jpg";
import { useRecoilState } from "recoil";
import { workspaceDetailState, workspaceUIState } from "states/workspace";

function WorkspaceHeader() {
  const [workspaceUI, setWorkspaceUI] = useRecoilState(workspaceUIState);
  const [workspaceDetail, setWorkspaceDetail] =
    useRecoilState(workspaceDetailState);

  return (
    <header className="w-full h-[60px] border-b flex justify-between items-center p-4">
      <div className="flex items-center justify-center">
        <i
          className="mr-3 text-2xl cursor-pointer fas fa-bars"
          onClick={() =>
            setWorkspaceUI({
              ...workspaceUI,
              leftSideOpen: !workspaceUI.leftSideOpen,
            })
          }
        ></i>
        <h2 className="text-xl font-apple-regular">{workspaceDetail.name}</h2>
      </div>

      <div className="flex items-center justify-center">
        <AvatarGroup
          items={workspaceDetail.users}
        />
      </div>
    </header>
  );
}

export default WorkspaceHeader;

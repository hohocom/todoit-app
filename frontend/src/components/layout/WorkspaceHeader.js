import AvatarGroup from 'components/shared/AvatarGroup';
import bgImg from 'assets/images/bg.jpg';
import { useRecoilState } from 'recoil'
import {  workspaceDetailState } from 'states/workspace'

function WorkspaceHeader() {
  const [workspaceDetail, setWorkspaceDetail] = useRecoilState(
    workspaceDetailState
  );
  
  return (
    <header className="w-full h-[60px] border-b flex justify-between items-center p-4">
      <h2 className="font-apple-bold">{workspaceDetail.name}</h2>

      <AvatarGroup
        items={[
          {
            thumbnailImage: bgImg,
          },
          {
            thumbnailImage: bgImg,
          },
          {
            thumbnailImage: bgImg,
          },
        ]}
      />
    </header>
  );
}

export default WorkspaceHeader;

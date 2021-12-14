/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from "recoil";
import { userState } from "states/user";

import WorkspaceList from "components/domain/workspace/WorkspaceList";
import ThemeContainer from "components/layout/ThemeContainer";
import ThemeMainBox from "components/layout/ThemeMainBox";
import ThemeTitleBox from "components/layout/ThemeTitleBox";
import ParticlesContainer from "components/layout/ParticlesContainer";
import withSecure from "components/domain/user/withSecure";

import WorkspaceCreateButton from "components/domain/workspace/WorkspaceCreateButton";
import WorkspaceJoinButton from "components/domain/workspace/WorkspaceJoinButton";

function WorkspacesPage() {
  const user = useRecoilValue(userState);

  return (
    <ThemeContainer>
      <ThemeTitleBox>
        <div className="font-shadow2">{user.nickname}님</div>
        <div className="font-shadow2">환영합니다!</div>
      </ThemeTitleBox>
      <ThemeMainBox>
        <div className="w-full mb-4">
          <h2>가입된 워크스페이스 ( {user.workspaces.length} )</h2>
          <WorkspaceList />
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <WorkspaceJoinButton />
          <WorkspaceCreateButton />
        </div>
        <div className="w-full mt-6 text-right">
          <button className="hover:text-[#ffac5ef3] text-sm">로그아웃</button>
        </div>
      </ThemeMainBox>
      <ParticlesContainer />
    </ThemeContainer>
  );
}

export default withSecure(WorkspacesPage);

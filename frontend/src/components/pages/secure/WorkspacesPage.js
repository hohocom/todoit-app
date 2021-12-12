import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'states/user';

import WorkspaceCreator from 'components/containers/domain/workspace/WorkspaceCreator';
import WorkspaceList from 'components/containers/domain/workspace/WorkspaceList';
import ThemeContainer from 'components/containers/layout/ThemeContainer';
import ThemeMainBox from 'components/containers/layout/ThemeMainBox';
import ThemeTitleBox from 'components/containers/layout/ThemeTitleBox';
import ParticlesContainer from 'components/containers/layout/ParticlesContainer';


function WorkspacesPage() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.debug('먼저 실행');
    
  }, []);

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
        <div className="w-full">
          <h2>초대코드로 가입</h2>
          <input
            className="w-full p-3 border border-[#FFC35E] rounded-[4px] outline-none bg-gray-50"
            placeholder="초대코드를 입력해주세요."
          />
        </div>
        <div className="w-full mt-4">
          <h2>워크스페이스 생성</h2>
          <WorkspaceCreator />
        </div>
        <div className="w-full mt-6 text-right">
          <button className="hover:text-[#ffac5ef3] text-sm">로그아웃</button>
        </div>
      </ThemeMainBox>
      <ParticlesContainer />
    </ThemeContainer>
  );
}

export default WorkspacesPage;

/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "states/user";

import WorkspaceList from "components/domain/workspace/WorkspaceList";
import ThemeContainer from "components/layout/ThemeContainer";
import ThemeMainBox from "components/layout/ThemeMainBox";
import ThemeTitleBox from "components/layout/ThemeTitleBox";
import ParticlesContainer from "components/layout/ParticlesContainer";
import withSecure from "components/domain/user/withSecure";

import WorkspaceCreateButton from "components/domain/workspace/WorkspaceCreateButton";
import WorkspaceJoinButton from "components/domain/workspace/WorkspaceJoinButton";
import LogoutButton from "components/domain/workspace/LogoutButton";
import Avatar from "components/shared/Avatar";
import ImagePreview from "components/shared/ImagePreview";
import { apiScaffold } from "utils/apis";

function WorkspacesPage() {
  const [user, setUser] = useRecoilState(userState);

  return (
    <ThemeContainer>
      <ThemeTitleBox>
        <div className="font-shadow2">{user.nickname}님</div>
        <div className="font-shadow2">환영합니다!</div>
      </ThemeTitleBox>
      <ThemeMainBox>
        <div className="flex items-start justify-start w-full mb-4">
          <div className="flex flex-col items-center">
            <Avatar thumbnailImage={user.thumbnailImage} size={60} />
            <ImagePreview
              initImage={async () => {
                console.debug("image init!");
                await apiScaffold({
                  method: "put",
                  url: `/users/${user.id}/profile-image-init`,
                });
                setUser({
                  ...user,
                  originImage: "",
                  thumbnailImage: "",
                });
              }}
              storeImage={async (file) => {
                const formData = new FormData();
                formData.append("profileImg", file);
                const { updateUserInfo } = await apiScaffold({
                  method: "put",
                  url: `/users/${user.id}`,
                  data: formData,
                });
                setUser({
                  ...user,
                  originImage: updateUserInfo.originImage,
                  thumbnailImage: updateUserInfo.thumbnailImage,
                });
              }}
            />
          </div>

          <div className="ml-2">
            <div>
              {user.nickname}{" "}
              <button
                className="p-1 bg-yellow-400 rounded-md pt-1.5 text-white text-xs"
                onClick={async () => {
                  const newNickname = window.prompt(
                    "바꿀 닉네임을 입력해주세요.",
                    user.nickname
                  );
                  if (!newNickname) return false;
                  const formData = new FormData();
                  formData.append("nickname", newNickname);
                  const { updateUserInfo } = await apiScaffold({
                    method: "put",
                    url: `/users/${user.id}`,
                    data: formData,
                  });
                  setUser({
                    ...user,
                    nickname: updateUserInfo.nickname,
                  });
                }}
              >
                닉네임 수정
              </button>
            </div>
            <div>{user.email}</div>
          </div>
        </div>
        <div className="w-full mb-4">
          <h2>가입된 워크스페이스 ( {user.workspaces.length} )</h2>
          <WorkspaceList />
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <WorkspaceJoinButton />
          <WorkspaceCreateButton />
        </div>
        <div className="w-full mt-6 text-right">
          <LogoutButton />
        </div>
      </ThemeMainBox>
      <ParticlesContainer />
    </ThemeContainer>
  );
}

export default withSecure(WorkspacesPage);

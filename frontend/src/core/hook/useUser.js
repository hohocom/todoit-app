import customAxios from "core/api";
import { userState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export function useUser() {
  const [user, setUser] = useRecoilState(userState);

  const getUserDetailById = async (userId) => {
    const { user } = await customAxios({
      method: "get",
      url: `/users/${userId}`,
    });

    setUserDetail(user);
  };

  const setUserDetail = (user) => {
    setUser({
      ...user,
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      originImage: user.originImage,
      thumbnailImage: user.thumbnailImage,
      workspaces: user.workspaces,
    });
  };

  const editNickname = async () => {
    console.debug("%c[닉네임 수정중..]", "color:#F39C12");

    const newNickname = window.prompt(
      "바꿀 닉네임을 입력해주세요.",
      user.nickname
    );
    if (!newNickname) return false;

    const formData = new FormData();
    formData.append("nickname", newNickname);

    const { updateUserInfo } = await customAxios({
      method: "put",
      url: `/users/${user.id}`,
      data: formData,
    });

    setUser({
      ...user,
      nickname: updateUserInfo.nickname,
    });
  };

  const initProfileImage = async () => {
    console.debug("%c[이미지 파일 초기화중..]", "color:#F39C12");

    await customAxios({
      method: "put",
      url: `/users/${user.id}/profile-image-init`,
    });

    setUser({
      ...user,
      originImage: "",
      thumbnailImage: "",
    });
  };

  const storeProfileImage = async (file) => {
    console.debug("%c[이미지 파일 변경중..]", "color:#F39C12");

    const formData = new FormData();
    formData.append("profileImg", file);

    const { updateUserInfo } = await customAxios({
      method: "put",
      url: `/users/${user.id}`,
      data: formData,
    });

    setUser({
      ...user,
      originImage: updateUserInfo.originImage,
      thumbnailImage: updateUserInfo.thumbnailImage,
    });
  };

  return {
    user,
    setUser,
    getUserDetailById,
    initProfileImage,
    storeProfileImage,
    editNickname,
  };
}

export function useUserLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    const res = await customAxios({
      method: "GET",
      url: "/users/logout",
    });
    console.debug(res);
    navigate("/");
  };

  return { logout };
}

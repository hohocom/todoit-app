import customAxios from "core/api";
import { userState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEmojiToast } from ".";

export function useUser() {
  const [user, setUser] = useRecoilState(userState);
  const { setEmojiToast } = useEmojiToast();

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
      level: user.level,
      exp: user.exp,
    });
  };

  const updateUserLevel = async (exp) => {
    console.debug("%c[유저 레벨 오르는중..]", "color:purple");
    // 레벨업 하기 전 효과를 주기위한 로직
    if (user.exp + exp >= 100) {
      setUser({
        ...user,
        exp: 100,
      });
      
      setEmojiToast({
        open: true,
        type: "HAPPY",
        second: 5000,
        message: "레벨업!! 앞으로도 호호컴퍼니를 위해 열심히 굴러주세요 ^.^",
      });
    }

    const formData = new FormData();
    formData.append("exp", exp);
    const res = await customAxios({
      method: "PUT",
      url: `/users/${user.id}/level-update`,
      data: formData,
    });

    setUser({
      ...user,
      level: res.user.level,
      exp: res.user.exp,
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
    updateUserLevel,
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

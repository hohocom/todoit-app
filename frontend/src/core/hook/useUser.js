import customAxios from "core/api";
import { userState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export function useUser() {
  const [user, setUser] = useRecoilState(userState);

  const getUserInfo = async (userId) => {
    const { user } = await customAxios({
      method: "get",
      url: `/users/${userId}`,
    });
    return user;
  };

  const initProfileImage = async () => {
    console.debug("image init!");
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
    getUserInfo,
    initProfileImage,
    storeProfileImage,
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

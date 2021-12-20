/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import customAxios from "core/api";
import { useUser } from "core/hook";
import axios from "axios";

export function useSecure() {
  const { user, setUser, getUserInfo } = useUser();

  useEffect(() => {
    console.debug("%c[유저 시큐리티 작동중..]", "color:red");
    console.debug("%c[유저 정보 확인 중..]", "color:purple");
    isLoggedIn();
  }, [user]);

  const isLoggedIn = async () => {
    if (user.id) {
      console.debug("%c[유저 정보 인증 ok]", "color:orange");
    } else {
      console.debug("%c[회원정보 미확인 -> 리프레시 토큰 요청]", "color:gray");
      const { id } = await refreshToken();
      const user = await getUserInfo(id);
      setUser({
        ...user,
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        originImage: user.originImage,
        thumbnailImage: user.thumbnailImage,
        workspaces: user.workspaces,
      });
    }
  };

  const refreshToken = async () => {
    const res = await customAxios({
      method: "get",
      url: "/users/refresh-token",
    });
    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["Authorization"] = `bearer ${res.act.token}`;
    return res.act;
  };
}

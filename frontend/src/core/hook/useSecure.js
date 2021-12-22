/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "core/hook";
import axios from "axios";
import useAxios from "./useAxios";

export function useSecure() {
  const { user, getUserDetailById } = useUser();
  const { customAxios } = useAxios();

  useEffect(() => {
    console.debug("%c[유저 시큐리티 작동중..]", "color:red");
    isLoggedIn();
  }, [user]);

  const isLoggedIn = async () => {
    if (user.id) {
      console.debug("%c[유저정보 인증ok]", "color:orange");
    } else {
      console.debug("%c[유저정보 미확인 -> 리프레시 토큰 요청]", "color:gray");
      const { id } = await refreshToken();
      await getUserDetailById(id);
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

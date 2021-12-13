/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'states/user';
import { apiScaffold } from 'utils/apis';

function withSecure(Component) {
  return () => {
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
      console.debug('%c[유저 시큐리티 작동중..]', 'color:red');
      console.debug('%c[유저 정보 확인 중..]', 'color:red');
      isLoggedIn();
    }, [user]);

    const isLoggedIn = async () => {
      if (user.id) {
        console.debug('유저 정보 인증 ok');
        console.debug(user);
      } else {
        console.debug('회원정보 미확인 -> 리프레시 토큰 요청');
        const { id } = await refreshToken();
        const res = await getUserInfo(id);
        setUser({
          ...user,
          id: res.user.id,
          email: res.user.email,
          nickname: res.user.nickname,
          workspaces: res.user.workspaces,
        });
        console.debug(user);
      }
    };

    const refreshToken = async () => {
      const res = await apiScaffold({
        method: 'get',
        url: '/users/refresh-token',
      });
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${res.act.token}`;
      return res.act;
    };

    const getUserInfo = async (userId) => {
      const res = await apiScaffold({
        method: 'get',
        url: `/users/${userId}`,
      });
      return res;
    };

    return <Component />;
  };
}

export default withSecure;

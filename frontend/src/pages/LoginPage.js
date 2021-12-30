/* eslint-disable react-hooks/exhaustive-deps */
import { ParticleContainer } from "components/layout";
import {
  ThemeContainer,
  ThemeTitleBox,
  ThemeMainBox,
} from "components/layout/theme";
import { Link } from "react-router-dom";
import { KakaoButton, NaverButton } from "components/layout/button";

import loginCoverImg from "assets/images/login-cover.png";
import { useLoginEvent } from "core/hook";
import { useEffect } from "react";

function LoginPage() {
  const { checkLoginOkThenNavToWorkspacesPage } = useLoginEvent();
  useEffect(() => {
    checkLoginOkThenNavToWorkspacesPage();
  }, []);

  return (
    <ThemeContainer>
      <ThemeTitleBox>
        <div className="font-shadow2">소셜 계정으로 간편하게</div>
        <div className="font-shadow2">투두잇에 로그인하세요.</div>
      </ThemeTitleBox>
      <ThemeMainBox>
        <div className="w-[400px] rounded-sm px-4 z-10">
          <img src={loginCoverImg} alt="img" />
          <KakaoButton />
          <NaverButton />

          <Link
            to="/"
            className="flex justify-center w-full mt-10 text-base font-apple-light"
          >
            소개사이트로 돌아가기
          </Link>
        </div>
      </ThemeMainBox>
      <ParticleContainer />
    </ThemeContainer>
  );
}

export default LoginPage;

import { Link } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

import kakaoImg from 'assets/images/kakao_logo.png';
import naverImg from 'assets/images/naver_logo.png';
import loginCoverImg from 'assets/images/login-cover.png';
import ParticlesContainer from 'components/layout/ParticlesContainer';
import ThemeContainer from 'components/layout/ThemeContainer';
import ThemeTitleBox from 'components/layout/ThemeTitleBox';
import ThemeMainBox from 'components/layout/ThemeMainBox';

function LoginPage() {
  useEffect(() => {
    initializeNaverLogin();
    naverLoginButtonCustomize();
  }, []);

  const naverLoginButtonCustomize = () => {
    const naverLoginButtonContainer = document.querySelector('#naverIdLogin');
    naverLoginButtonContainer.querySelector('img').style.display = 'none';
    const naverLoginButton = naverLoginButtonContainer.querySelector(
      '#naverIdLogin_loginButton'
    );
    naverLoginButton.classList =
      'flex justify-center items-center w-full h-full';
    naverLoginButton.innerHTML = `
    <img src=${naverImg} alt="img" class="w-[40px] pb-1" />
    <span class="text-xl font-apple-bold">네이버 로그인</span>
    `;
  };

  const initializeNaverLogin = () => {
    // eslint-disable-next-line no-undef
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URL,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'green', type: 3, height: '40' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  return (
    <ThemeContainer>
      <ThemeTitleBox>
        <div className="font-shadow2">소셜 계정으로 간편하게</div>
        <div className="font-shadow2">투두잇에 로그인하세요.</div>
      </ThemeTitleBox>
      <ThemeMainBox>
        <div className="w-[400px] rounded-sm px-4 z-10">
          <img src={loginCoverImg} alt="img" />
          <a
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`}
            className="w-full h-[60px] flex justify-center items-center bg-[#FEE500] rounded-[4px]"
          >
            <img src={kakaoImg} alt="img" className="w-[40px]" />
            <span className="pt-1 text-xl font-apple-bold">카카오 로그인</span>
          </a>
          <div
            id="naverIdLogin"
            className="w-full h-[60px] pt-1 mt-2 flex justify-center items-center bg-[#03C75A] color-white rounded-[4px]"
          ></div>
          <Link
            to="/"
            className="flex justify-center w-full mt-10 text-base font-apple-light"
          >
            소개사이트로 돌아가기
          </Link>
        </div>
      </ThemeMainBox>
      <ParticlesContainer />
    </ThemeContainer>
  );
}

export default LoginPage;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import naverImg from "assets/images/naver_logo.png";

export function useNaverApi() {
  const { hash } = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getNaverAccessByQuerystring();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNaverAccessByQuerystring = () => {
    console.log(hash);
    const querystringArray = hash.split("#access_token=")[1];
    const accessToken = querystringArray.split("&")[0];
    console.log(accessToken);
  };
}

export function useNaverButton() {
  useEffect(() => {
    initializeNaverLogin();
    naverLoginButtonCustomize();
  }, []);

  const naverLoginButtonCustomize = () => {
    const naverLoginButtonContainer = document.querySelector("#naverIdLogin");
    naverLoginButtonContainer.querySelector("img").style.display = "none";
    const naverLoginButton = naverLoginButtonContainer.querySelector(
      "#naverIdLogin_loginButton"
    );
    naverLoginButton.classList =
      "flex justify-center items-center w-full h-full";
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
      loginButton: { color: "green", type: 3, height: "40" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };
}

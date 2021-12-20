import kakaoImg from "assets/images/kakao_logo.png";

function KakaoButton() {
  return (
    <a
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`}
      className="w-full h-[60px] flex justify-center items-center bg-[#FEE500] rounded-[4px]"
    >
      <img src={kakaoImg} alt="img" className="w-[40px]" />
      <span className="pt-1 text-xl font-apple-bold">카카오 로그인</span>
    </a>
  );
}

export default KakaoButton;

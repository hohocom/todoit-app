import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { particles } from '../lib/particles'
import kakaoImg from '../assets/images/kakao_logo.png'
import naverImg from '../assets/images/naver_logo.png'

function LoginPage() {
  useEffect(() => {
    particles()
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-screen text-[#424242]">
      <div className="relative flex flex-col items-center justify-center flex-1 h-full text-4xl text-white bg-red-400 font-apple-hard ">
        <div className="font-shadow2">소셜 계정으로 간편하게</div>
        <div className="font-shadow2">투두잇에 로그인하세요.</div>
      </div>
      <div className="flex items-center justify-center flex-1 w-full h-full bg-white font-apple-regular">
        <div className="w-[400px] rounded-sm p-4 z-10">
          <div className="flex flex-col items-center justify-center w-full text-4xl font-apple-bold">
            <div>Social Login</div>
            <div className="h-[50px] border-r border-gray-400 mb-2"></div>
          </div>
          <a
            href="/"
            className="w-full h-[60px] flex justify-center items-center bg-[#FEE500] border border-yellow-400 border-c-sm"
          >
            <img src={kakaoImg} alt="img" className="w-[40px]" />
            <span className="pt-1 text-xl">카카오 로그인</span>
          </a>
          <a
            href="/"
            className="w-full h-[60px] pt-1 mt-2 flex justify-center items-center bg-[#03C75A] color-white border border-green-600 border-c-sm"
          >
            <img src={naverImg} alt="img" className="w-[40px] pb-1" />
            <span className="text-xl">네이버 로그인</span>
          </a>
          <Link to="/" className="z-10 flex justify-center w-full mt-5 text-base font-apple-light">
            소개사이트로 돌아가기
          </Link>
        </div>
      </div>
      <div
        id="particles-js"
        className="absolute top-0 left-0 w-full h-screen"
      ></div>
    </div>
  )
}

export default LoginPage

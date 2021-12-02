import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import WelcomeLayout from '../layouts/WelcomeLayout'
import { particles } from '../lib/particles'
import cloudImg from '../assets/images/cloud.svg'
import helloImg from '../assets/images/hello.png'

function WelcomePage() {
  useEffect(() => {
    particles()
  }, [])

  return (
    <WelcomeLayout>
      <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        <div className="z-10 flex flex-col items-center">
          {/* <img src={calendarImg} alt="img" className="w-[300px]"/> */}
          <div className="text-xl text-black">
            업무를 심플하게 관리하는 방법
          </div>
          <div className="text-6xl text-black font-apple-hard">TODOIT</div>
          <br />
          <Link
            to="/login"
            className="flex items-center justify-center px-5 py-3 text-2xl bg-gray-100 border border-c-sm"
          >
            투두잇 시작하기
            <img src={helloImg} alt="img" className="ml-1 mb-1 w-[40px]" />
          </Link>
        </div>
        <div className="absolute left-0 w-full -bottom-0 lg:-bottom-32">
          <img src={cloudImg} alt="img" />
        </div>
        <div
          id="particles-js"
          className="absolute top-0 left-0 w-full h-screen"
        ></div>
      </div>
      {/* <div className="w-full h-screen bg-red-300"></div> */}
    </WelcomeLayout>
  )
}

export default WelcomePage

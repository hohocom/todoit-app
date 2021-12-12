import { Link } from 'react-router-dom'
import WelcomHeader from 'components/containers/layout/WelcomeHeader'
import cloud1Img from 'assets/images/cloud2.svg'
import cloud2Img from 'assets/images/cloud3.svg'
import heartImg from 'assets/images/heart.png'
import 'utils/particles.min.js'
import { useEffect } from 'react/cjs/react.development'
import { particlesPlay } from 'utils/particles'
import { scrollEvent } from 'utils/scrollEvent'

function WelcomePage() {
  useEffect(() => {
    particlesPlay()
    window.addEventListener('scroll', scrollEvent)

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [])

  return (
    <div className="flex-col items-start justify-center w-full h-full font-apple-regular text-[#424242]">
      <WelcomHeader/>
      <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        <div className="z-30 flex flex-col items-center">
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
            <img src={heartImg} alt="img" className="ml-1 mb-1 w-[20px]" />
          </Link>
        </div>

        <img
          src={cloud1Img}
          alt="img"
          className="absolute left-0 z-10 w-full -bottom-2"
        />
        <img
          src={cloud2Img}
          alt="img"
          className="fixed left-0 z-[-1] w-full -bottom-10"
        />
        <div
          id="particles-js"
          className="absolute top-0 left-0 w-full h-screen"
        ></div>
      </div>
      <div className="z-50 w-full h-screen bg-[#FFB45E]"></div>
    </div>
  )
}

export default WelcomePage

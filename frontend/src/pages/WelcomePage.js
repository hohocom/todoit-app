<<<<<<< HEAD
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import WelcomeLayout from '../layouts/WelcomeLayout'
import { particles } from '../lib/particles'
import calendarImg from '../assets/images/calendar2.png' 

function WelcomePage() {
  useEffect(() => {
    particles()
  }, [])

  return (
    <WelcomeLayout>
      <div className="relative flex flex-col items-center justify-center w-full h-screen ">
        <div className="z-10 flex flex-col items-center">
          {/* <img src={calendarImg} alt="img" className="w-[300px]"/> */}
          <div className="text-4xl">업무를 심플하게 관리하는 방법</div>
          <div className="text-6xl font-apple-hard font-shadow">TODOIT.</div>
          <br/>
          <Link
            to="/login"
            className="px-5 py-3 text-2xl bg-white border rounded-sm"
          >
            투두잇 시작하기
          </Link>
        </div>

        <div
          id="particles-js"
          className="absolute top-0 left-0 w-full h-screen"
        ></div>
      </div>

      <div className="w-full h-screen bg-red-300"></div>
    </WelcomeLayout>
  )
=======
import WelcomeLayout from '../layouts/WelcomeLayout'

function WelcomePage() {
    return <WelcomeLayout></WelcomeLayout>
>>>>>>> f138b5692d43578dcf46f06d452ee0ad779a6497
}

export default WelcomePage

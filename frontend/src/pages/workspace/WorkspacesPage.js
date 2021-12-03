import { useEffect } from 'react'
import { particlesInit, particlesPlay } from '../../customs/particles'

function WorkspacesPage() {
  useEffect(() => {
    particlesInit()
    particlesPlay()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-[#FFC35E] to-[#ffac5ef3] font-apple-regular text-[#424242]">
      <div className="relative z-10 flex flex-col items-center justify-center text-2xl text-white py-14 sm:text-4xl sm:py-5 font-apple-hard">
        <div className="font-shadow2">고재범님</div>
        <div className="font-shadow2">환영합니다!</div>
      </div>
      <div className="w-full sm:w-[400px] h-full sm:h-[500px] bg-[#F2F2F2] rounded-t-3xl rounded-b-none sm:rounded-xl flex flex-col justify-start items-center p-[30px] z-10">
        <h2>고재범</h2>
        <h3>님의 워크스페이스</h3>
      </div>
      <div
        id="particles-js"
        className="absolute top-0 left-0 w-full h-screen"
      ></div>
    </div>
  )
}

export default WorkspacesPage

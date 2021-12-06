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
        <div className="w-full">
          <h2>가입된 워크스페이스 ( 2 )</h2>
          <div className="border rounded-[4px] flex justify-between items-center bg-gray-50 mt-2">
            <div
              id="title"
              className="p-4 cursor-pointer hover:text-yellow-500 font-apple-bold"
            >
              호호컴퍼니
            </div>
            <div className="p-4">
              <i className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"></i>
              <i className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"></i>
            </div>
          </div>
          <div className="border rounded-[4px] flex justify-between items-center bg-gray-50 mt-2">
            <div
              id="title"
              className="p-4 cursor-pointer hover:text-yellow-500 font-apple-bold"
            >
              방송대학과일정
            </div>
            <div className="p-4">
              <i className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"></i>
              <i className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"></i>
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <h2>초대코드로 가입</h2>
          <input
            className="w-full p-4 border border-[#FFC35E] rounded-[4px] outline-none"
            placeholder="초대코드를 입력해주세요."
          />
        </div>
      </div>
      <div
        id="particles-js"
        className="absolute top-0 left-0 w-full h-screen"
      ></div>
    </div>
  )
}

export default WorkspacesPage

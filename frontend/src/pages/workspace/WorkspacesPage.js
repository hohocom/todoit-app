import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { particlesPlay } from '../../customs/particles'
import '../../lib/particles.min.js'

function WorkspacesPage() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    particlesPlay()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-[#FFC35E] to-[#ffac5ef3] font-apple-regular text-[#424242]">
      <div className="relative z-10 flex flex-col items-center justify-center text-2xl text-white py-14 sm:text-4xl sm:py-5 font-apple-hard">
        <div className="font-shadow2">고재범님</div>
        <div className="font-shadow2">환영합니다!</div>
      </div>
      <div className="w-full sm:w-[400px] h-full sm:h-auto bg-[#F2F2F2] rounded-t-3xl rounded-b-none sm:rounded-xl flex flex-col justify-start items-center p-[30px] z-10">
        <div className="w-full mb-4">
          <h2>가입된 워크스페이스 ( 2 )</h2>
          <div className="border rounded-[4px] flex justify-between items-center bg-gray-50 mt-2">
            <div
              id="title"
              className="p-3 mt-1 cursor-pointer hover:text-yellow-500 font-apple-bold"
            >
              호호컴퍼니
            </div>
            <div className="p-3">
              <i className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"></i>
              <i className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"></i>
            </div>
          </div>
          <div className="border rounded-[4px] flex justify-between items-center bg-gray-50 mt-2">
            <div
              id="title"
              className="p-3 mt-1 cursor-pointer hover:text-yellow-500 font-apple-bold"
            >
              방송대학과일정
            </div>
            <div className="p-3">
              <i className="mx-2 cursor-pointer far fa-edit hover:text-yellow-500"></i>
              <i className="mx-2 cursor-pointer far fa-trash-alt hover:text-red-500"></i>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2>초대코드로 가입</h2>
          <input
            className="w-full p-3 border border-[#FFC35E] rounded-[4px] outline-none"
            placeholder="초대코드를 입력해주세요."
          />
        </div>

        <div className="w-full mt-4">
          <h2>워크스페이스 생성</h2>
          <div className="flex items-center justify-between">
            <input
              className="w-full p-3 border rounded-[4px] outline-none"
              placeholder="워크스페이스 이름"
            />
            <button className="min-w-[30%] p-3 bg-[#ffac5ef3] text-white rounded-[4px] ml-1">
              생성
            </button>
          </div>
        </div>

        <div className="w-full mt-6 text-right">
          <button className="hover:text-[#ffac5ef3] text-sm">로그아웃</button>
        </div>
      </div>
      <div
        id="particles-js"
        className="absolute top-0 left-0 w-full h-screen"
      ></div>

      <Modal
        state={{ open, setOpen }}
        options={{
          backgroundClose: true,
          closeButtonType: 2, // 1: arrow, 2: X
        }}
        children={
        <div className="w-full h-[100px] border">
          hello world!!
        </div>}
      ></Modal>
    </div>
  )
}

export default WorkspacesPage

import { useEffect, useState } from 'react'
import bgImg from '../../assets/images/bg.jpg'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import checkWhite from '../../assets/images/check-white.png'
import Modal from '../shared/Modal'

function CalendarShowModal() {
  const [createModalOpen, setCreateModalOpen] = useState(true)

  return (
    <Modal
      state={{ open: createModalOpen, setOpen: setCreateModalOpen }}
      options={{
        backgroundClose: true,
        closeButtonType: 2, // 1: arrow, 2: X
      }}
    >
      <div>
        <p className="mb-2 text-xl font-apple-bold">오늘의 할일</p>
        <div className="flex flex-col ">
          <div className="relative ">
            <div className="pt-1 pb-2 pl-2 pr-2 mt-5 mb-5 bg-white border rounded-md ">
              <div className="absolute top-0 flex justify-center w-full">
                <img
                  src={bgImg}
                  alt="img"
                  className="w-10 h-10 rounded-full "
                />
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-4 h-4 mt-1 mr-1 bg-gray-300 rounded-full">
                  <img src={checkWhite} className="w-3 h-3 " alt="img" />
                </div>
                <p className="mt-2 text-black font-apple-bold">
                  투두잇 기능구현
                </p>
              </div>

              <p>
                - 잡코리아, 사람인을 제외하고 워크넷과 인크루트 등 다양한
                취업포털사이트에 게시
              </p>
              <div className="flex items-center mt-1">
                <div className="w-12 flex justify-center items-center px-1 pt-0.5 text-[12px] mr-1 bg-[#FF9E5D] rounded-sm">
                  #고재범
                </div>
                <div className="w-12 flex justify-center items-center px-1 pt-0.5 text-[12px] mr-1 bg-[#FF9E5D] rounded-sm">
                  #고재범
                </div>
                <div className="w-12 flex justify-center items-center px-1 pt-0.5 text-[12px] mr-1 bg-[#FF9E5D] rounded-sm">
                  #고재범
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default CalendarShowModal

import { useEffect, useRef, useState } from 'react'
import bgImg from '../assets/images/bg.jpg'
import plus from '../assets/images/plus.png'
import Modal from '../components/Modal'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import ko from 'date-fns/locale/ko'
import checkBlack from '../assets/images/check-black.png'
import checkWhite from '../assets/images/check-white.png'
function WorkspaceLayout({ children }) {
  const [createModalOpen, setCreateModalOpen] = useState(true)
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ])
  const dateString = (date) => {
    var year = date.getFullYear()
    var month = ('0' + (date.getMonth() + 1)).slice(-2)
    var day = ('0' + date.getDate()).slice(-2)
    var dateString = year + '-' + month + '-' + day
    return dateString
  }

  const colors = [
    'bg-gray-200',
    'bg-pink-200',
    'bg-red-200',
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200',
  ]
  const [colorNumber, setColorNumber] = useState(0)
  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    content: '',
    color: colors[0],
    joinMember: '',
    startTime: '',
    endTime: '',
  })
  const scheduleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    if (name === 'title') {
      setScheduleForm({ ...scheduleForm, title: value })
    } else if (name === 'content') {
      setScheduleForm({ ...scheduleForm, content: value })
    }
  }

  const changeColor = (index) => {
    setColorNumber(index)
    setScheduleForm({ ...scheduleForm, color: colors[index] })
  }
  const submit = () => {
    console.log(dateString(dateState[0].startDate))

    setScheduleForm({
      ...scheduleForm,
      startTime: dateString(dateState[0].startDate),
    })
    setScheduleForm({
      ...scheduleForm,
      endTime: dateString(dateState[0].endDate),
    })
  }
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    console.log(scheduleForm)
  })

  return (
    <div className="fixed top-0 left-0 flex w-full h-full font-apple-light">
      <aside className="min-w-[300px] h-full border-r border-gray-300">
        <figure className="w-full p-10">LOGO</figure>
      </aside>
      <main className="flex-col w-full h-full">
        <header className="w-full h-[60px] border-b"></header>
        <section className="w-full h-full   pb-[100px] ">{children}</section>
      </main>
      <aside className="min-w-[350px] h-full  ">
        <div className="w-full h-full bg-[#F2F2F2]  flex flex-col justify-start  p-[30px]">
          <div className="flex items-center justify-between w-full px-2 py-10">
            <i className="far fa-bell text-[#FF9E5D] text-3xl"></i>
            <i className="far fa-bell text-[#FF9E5D] text-3xl"></i>
          </div>
          <div className="flex flex-col items-center justify-center w-full bg-white rounded-3xl box-shadow1">
            <div className="w-[120px] h-[120px] rounded-full -mt-7 flex items-center justify-center border-4 border-rainbow-1">
              <img
                src={bgImg}
                alt="img"
                className="w-[100px] h-[100px] rounded-full"
              />
            </div>
            <div className="mt-4 text-xl text-black font-apple-hard">
              고재범
            </div>
            <div className="text-base text-gray-600 font-apple-bold">
              Developer
            </div>

            <div className="flex flex-col items-center justify-start w-full pl-5">
              <div className="mt-2 -mb-1 text-base text-black font-apple-bold w-[80%]">
                2 LVL
              </div>
              <div className="flex items-center justify-center w-[80%]">
                <div
                  id="lv-progress"
                  className="h-[20px] border border-[#FF9E5D] rounded-3xl w-full overflow-hidden"
                >
                  <div className="w-[40%] h-full bg-[#FF9E5D] transition-all delay-200"></div>
                </div>
                <div className="mt-1 ml-2 text-base text-black font-apple-bold">
                  40%
                </div>
              </div>
            </div>

            <div className="flex my-6 ">
              <div className="flex flex-col items-center border-r border-[#FF9E5D] px-5 pb-3">
                <div className="font-apple-bold text-xl text-[#FF9E5D] pb-3">
                  작성한 일정
                </div>
                <div className="text-3xl font-apple-hard">30</div>
              </div>
              <div className="flex flex-col items-center px-5">
                <div className="font-apple-bold text-xl text-[#FF9E5D] pb-3">
                  작성한 일정
                </div>
                <div className="text-3xl font-apple-hard">27</div>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-6">
            <div className="text-base font-apple-bold">TODAY</div>
            <div className="flex items-center mt-1 text-base">
              <p className="text-lg font-apple-bold">재범</p>님 즐거운
              아침이에요 :) 🍀
            </div>
          </div>
          <div>
            <div className="w-[100%] h-[100px] bg-white flex items-center p-5 rounded-2xl mb-5 box-shadow2">
              <div className="flex items-center">
                <div className="w-16 h-16  bg-[#FFB45E] rounded-full"></div>
                <div className="flex flex-col ml-4">
                  <p className="font-apple-bold ">제안서 디자인 PPT</p>
                  <p className="text-sm text-gray-500 font-apple-bold">
                    UI에 들어갈 페이지 리디자인
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[100%] h-[100px] bg-white flex items-center p-5 rounded-2xl box-shadow2">
              <div className="flex items-center">
                <div className="w-16 h-16  bg-[#FFB45E] rounded-full"></div>
                <div className="flex flex-col ml-4">
                  <p className="font-apple-bold ">제안서 디자인 PPT</p>
                  <p className="text-sm text-gray-500 font-apple-bold">
                    UI에 들어갈 페이지 리디자인
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <Modal
        state={{ open: createModalOpen, setOpen: setCreateModalOpen }}
        options={{
          backgroundClose: true,
          closeButtonType: 2, // 1: arrow, 2: X
        }}
        children={
          <div>
            <p className="mb-2 text-xl font-apple-bold">일정을 입력하세요</p>
            <input
              type="text"
              name="title"
              className="w-full h-10 p-1 mb-2 border rounded-md"
              placeholder="일정"
              onChange={scheduleFormChange}
            />
            <textarea
              type="text"
              name="content"
              className="w-full h-24 p-1 overflow-y-scroll border rounded-md custom-scroll"
              placeholder="내용"
              onChange={scheduleFormChange}
            />
            <p className="mt-2 ml-1 text-[15px]">색상</p>
            <div className="flex ">
              {colors.length > 0 &&
                colors.map((color, index) => {
                  return (
                    <div
                      className="relative"
                      key={index}
                      onClick={() => changeColor(index)}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 ml-1 rounded-full ${color} cursor-pointer`}
                      ></div>
                      {colorNumber === index && (
                        <div className="absolute top-0 z-10 flex items-center justify-center w-10 h-10 ml-1 rounded-full">
                          <img alt="" src={checkWhite} className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
            <p className="mt-2 ml-1 text-[15px] ">참석자</p>
            <div className="flex">
              <img
                src={plus}
                alt="img"
                className="top-0 flex items-center justify-center w-10 h-10 p-2 ml-1 bg-gray-200 rounded-full cursor-pointer"
              />

              <img
                src={bgImg}
                alt="img"
                className="w-10 h-10 ml-1 rounded-full"
              />
              <img
                src={bgImg}
                alt="img"
                className="w-10 h-10 ml-1 rounded-full"
              />
              <img
                src={bgImg}
                alt="img"
                className="w-10 h-10 ml-1 rounded-full"
              />
            </div>
            <DateRange
              className="flex items-center justify-center w-full"
              editableDateInputs={true}
              onChange={(item) => setDateState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateState}
              months={1}
              rangeColors="#ff935dad"
              color="#ff935dad"
              direction="horizontal"
              locale={ko}
            />
            <div className="flex text-white font-apple-bold">
              <button
                className="w-full h-10  mt-2  rounded-md bg-[#ff925d]"
                onClick={submit}
              >
                일정입력
              </button>
            </div>
          </div>
        }
      ></Modal>
    </div>
  )
}

export default WorkspaceLayout

import { useEffect, useState } from 'react'
import { addDays } from 'date-fns'
import bgImg from '../../assets/images/bg.jpg'
import plus from '../../assets/images/plus.png'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import ko from 'date-fns/locale/ko'
import checkWhite from '../../assets/images/check-white.png'
import Modal from '../shared/Modal'

function CalendarCreateModal() {
  const [createModalOpen, setCreateModalOpen] = useState(true)
  const [dateState, setDateState] = useState([
    {
      startDate: '',
      endDate: addDays('', 1),
      key: 'selection',
    },
  ])
  const dateString = (date) => {
    var year = date.getFullYear()
    var month = ('0' + (date.getMonth() + 1)).slice(-2)
    var day = ('0' + date.getDate()).slice(-2)
    var dateReturn = year + '-' + month + '-' + day
    return dateReturn
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
    setScheduleForm({
      ...scheduleForm,
      startTime: dateString(dateState[0].startDate),
      endTime: dateString(dateState[0].endDate),
    })

    console.log(scheduleForm)
  }
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    console.log(scheduleForm)
  }, [scheduleForm])
  return (
    <Modal
      state={{ open: createModalOpen, setOpen: setCreateModalOpen }}
      options={{
        backgroundClose: true,
        closeButtonType: 2, // 1: arrow, 2: X
      }}
    >
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

          <img src={bgImg} alt="img" className="w-10 h-10 ml-1 rounded-full" />
          <img src={bgImg} alt="img" className="w-10 h-10 ml-1 rounded-full" />
          <img src={bgImg} alt="img" className="w-10 h-10 ml-1 rounded-full" />
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
    </Modal>
  )
}
export default CalendarCreateModal

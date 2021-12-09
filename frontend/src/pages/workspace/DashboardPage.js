import WorkspaceLayout from '../../layouts/WorkspaceLayout'
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import { useRecoilState } from 'recoil'
import { showCalendarState } from '../../globalState/calendar'
import { createCalendarState } from '../../globalState/calendar'
function DashboardPage() {
  const [showCalendar, setShowCalendar] = useRecoilState(showCalendarState)
  const [createCalendar, setCreateCalendar] = useRecoilState(
    createCalendarState,
  )
  const handleDateClick = (args) => {}
  const handleEventClick = (args) => {
    console.log(args)
    setShowCalendar(!showCalendar)
  }

  const data = [
    {
      title: 'event 1',
      start: '2021-12-06',
      color: 'pink',
    },
    {
      title: 'event 1',
      start: '2021-12-06',
      end: '2021-12-09',
      color: 'pink',
    },
    { title: 'event 1', start: '2021-12-06', color: 'pink' },
    { title: 'event 2', start: '2021-12-07', color: 'pink' },
  ]
  return (
    <WorkspaceLayout>
      <div className=" mypage-body">
        <div className=" body-wrapper box">
          <div className=" body-info-container">
            <div className="mt-5 calendar-wrapper font-apple-light">
              <FullCalendar
                customButtons={{
                  myCustomButton: {
                    text: '일정추가',
                    click: function () {
                      setCreateCalendar(!createCalendar)
                    },
                  },
                }}
                height="857px"
                headerToolbar={{
                  left: 'title',
                  center: 'myCustomButton',
                  right: 'prev,today,next',
                  //  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick} // 달력 클릭시 이벤트
                eventClick={handleEventClick} // 이벤트 클릭시 이벤트
                dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
                events={data}
              />
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  )
}

export default DashboardPage

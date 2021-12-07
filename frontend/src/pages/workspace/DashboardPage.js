import WorkspaceLayout from '../../layouts/WorkspaceLayout'
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

function DashboardPage() {
  const handleDateClick = (args) => {
    console.log('handleDateClick')
    console.log(args)
  }
  const handleEventClick = (args) => {
    console.log('handleEventClick')
    console.log(args)
  }

  return (
    <WorkspaceLayout>
      <div className=" mypage-body">
        <div className=" body-wrapper box">
          <div className=" body-info-container">
            <div className="mt-5 calendar-wrapper font-apple-light">
              <FullCalendar
                height="857px"
                headerToolbar={{
                  left: 'title',
                  center: '',
                  right: 'prev,today,next',
                  //  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick} // 달력 클릭시 이벤트
                eventClick={handleEventClick} // 이벤트 클릭시 이벤트
                dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
                events={[
                  {
                    title: 'event 1',
                    date: '2021-12-06',
                    color: 'pink',
                    image_url:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYBWGxMtjrF82aMLMhHS9C692o6n5Rccj_4Q&usqp=CAU',
                  },
                  { title: 'event 1', date: '2021-12-06' },
                  { title: 'event 1', date: '2021-12-06' },
                  { title: 'event 1', date: '2021-12-06' },
                  { title: 'event 2', date: '2021-12-07' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  )
}

export default DashboardPage

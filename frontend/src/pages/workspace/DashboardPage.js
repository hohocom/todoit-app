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
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={[
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

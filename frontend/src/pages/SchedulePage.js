import React from "react";
import {
  WorkspaceContainer,
  WorkspaceLeftSide,
  WorkspaceRightSide,
  WorkspaceMain,
  WorkspaceHeader,
  WorkspaceSection,
} from "components/layout/workspace";
import { WorkDetailModal, WorkFormModal } from "components/layout/work";
import {
  useFullCalendar,
  useSecure,
  useSetWorkspaceDetail,
  useWork,
} from "core/hook";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function SchedulePage() {
  useSecure();
  const { workspaceDetail } = useSetWorkspaceDetail();
  const { renderEventContent, handleEventClick } = useFullCalendar();
  const { workFormModalOpen } = useWork();

  return (
    <React.Fragment>
      <WorkspaceContainer>
        <WorkspaceLeftSide />
        <WorkspaceMain>
          <WorkspaceHeader />
          <WorkspaceSection>
            <div className="w-full h-full font-apple-light">
              <FullCalendar
                customButtons={{
                  workCreateButton: {
                    text: "일정추가",
                    click: function () {
                      workFormModalOpen();
                    },
                  },
                }}
                height="100%"
                headerToolbar={{
                  left: "title,workCreateButton",
                  right: "prev,today,next",
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                // dateClick={handleDateClick} // 달력 클릭시 이벤트
                eventClick={handleEventClick} // 이벤트 클릭시 이벤트
                // dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
                events={workspaceDetail.works}
                eventContent={renderEventContent}
                // eslint-disable-next-line react/jsx-no-duplicate-props
              />
            </div>
          </WorkspaceSection>
        </WorkspaceMain>
        <WorkspaceRightSide />
      </WorkspaceContainer>
      <WorkFormModal />
      <WorkDetailModal />
    </React.Fragment>
  );
}

export default SchedulePage;

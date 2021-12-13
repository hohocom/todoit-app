import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { workCreateModalState } from "states/work";
import { worksShowModalState } from "states/work";
import { workspaceDetailState } from "states/workspace";
import { apiScaffold } from "utils/apis";

import WorkspaceContainer from "components/layout/WorkspaceContainer";
import WorkspaceLeftSide from "components/layout/WorkspaceLeftSide";
import WorkspaceMain from "components/layout/WorkspaceMain";
import WorkspaceHeader from "components/layout/WorkspaceHeader";
import WorkspaceSection from "components/layout/WorkspaceSection";
import WorkspaceRightSide from "components/layout/WorkspaceRightSide";
import WorkCreateModal from "components/domain/work/WorkCreateModal";
import WorksShowModal from "components/domain/work/WorksShowModal";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import SockJsClient from "react-stomp";
import withSecure from "components/domain/user/withSecure";

function DashboardPage() {
  const websocket = useRef();

  const [worksShowModal, setWorksShowModal] =
    useRecoilState(worksShowModalState);
  const [workCreateModal, setWorkCreateModal] =
    useRecoilState(workCreateModalState);
  const workspaceDetail = useRecoilValue(workspaceDetailState);

  const handleDateClick = (args) => {};
  const handleEventClick = (args) => {
    console.log(args);
    setWorksShowModal(!worksShowModal);
  };
  const [data, setDate] = useState([]);
  useEffect(() => {
    if (workspaceDetail.id) {
      getWorks();
    }
  }, [workspaceDetail.id]);

  const getWorks = async () => {
    console.log("getWorks");
    const res = await apiScaffold({
      method: "get",
      url: `/works?workspaceId=${workspaceDetail.id}`,
    });
    console.log(res.works);
    const _array = [];
    for (let i = 0; i < res.works.length; i++) {
      _array.push({
        title: res.works[i].title,
        start: res.works[i].startDate,
        end: res.works[i].endDate,
        color: res.works[i].themeColor,
      });
    }
    setDate(_array);
    console.log(data);
  };

  return (
    <WorkspaceContainer>
      <WorkspaceLeftSide />
      <WorkspaceMain>
        <WorkspaceHeader />
        <WorkspaceSection>
          <SockJsClient
            url={`${process.env.REACT_APP_API_URL}/start`}
            topics={["/topics/sendTo", "/topics/template", "/topics/api"]}
            onMessage={(msg) => {
              console.log(msg);
            }}
            ref={websocket}
          />
          <div className=" mypage-body">
            <div className=" body-wrapper box">
              <div className=" body-info-container">
                <div className="mt-5 calendar-wrapper font-apple-light">
                  <FullCalendar
                    customButtons={{
                      myCustomButton: {
                        text: "일정추가",
                        click: function () {
                          setWorkCreateModal(!workCreateModal);
                        },
                      },
                    }}
                    height="857px"
                    headerToolbar={{
                      left: "title",
                      center: "myCustomButton",
                      right: "prev,today,next",
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
        </WorkspaceSection>
      </WorkspaceMain>
      <WorkspaceRightSide />

      <WorkCreateModal />
      <WorksShowModal />
    </WorkspaceContainer>
  );
}

export default withSecure(DashboardPage);

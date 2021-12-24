/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { workDetailModalState, workspaceDetailState } from "core/state";
import scheduleCompletedImg from "assets/images/schedule_complete2.svg";

export function useFullCalendar() {
  const workspaceDetail = useRecoilValue(workspaceDetailState);
  const setWorkDetailModal = useSetRecoilState(workDetailModalState);

  const handleEventClick = (args) => {
    workspaceDetail.works.forEach((work) => {
      if (work.id === Number(args.event.id)) {
        console.debug("%c[일정 디테일 설정중..],", "color:red");
        console.debug(work);
        setWorkDetailModal({
          isOpen: true,
          id: work.id,
          title: work.title,
          content: work.content,
          themeColor: work.color,
          isFinished: work.isFinished,
          workers: work.users,
          startDate: work.start,
          endDate: work.end,
        });
      }
    });
  };

  // 풀캘린더에서 보여줄 일정 커스터마이징
  function renderEventContent(eventInfo) {
    let isFinished = 0;
    workspaceDetail.works.forEach((work) => {
      if (work.id === Number(eventInfo.event.id)) {
        isFinished = Number(work.isFinished);
      }
    });

    return (
      <div className="relative flex items-center overflow-hidden cursor-pointer">
        <p className="pl-1 mt-0.5 text-black w-full overflow-hidden">
          {eventInfo.event.title}
        </p>
        {isFinished === 1 && (
          <img
            src={scheduleCompletedImg}
            alt="img"
            className="w-[60px] absolute -right-4"
          />
        )}
      </div>
    );
  }

  return { renderEventContent, handleEventClick };
}

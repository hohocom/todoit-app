/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSetWorkspaceDetail } from "core/hook";
import useAxios from "./useAxios";
import { useRecoilState } from "recoil";
import { workDetailModalState } from "core/state";
import scheduleCompletedImg from "assets/images/schedule_complete2.svg";

export function useFullCalendar() {
  const { customAxios } = useAxios();
  const { workspaceDetail, setWorkspaceDetail } = useSetWorkspaceDetail();
  const [workDetailModal, setWorkDetailModal] =
    useRecoilState(workDetailModalState);

  useEffect(() => {
    if (workspaceDetail.id) {
      getWorks();
    }
  }, [workspaceDetail.id]);

  const getWorks = async () => {
    const res = await customAxios({
      method: "get",
      url: `/works?workspaceId=${workspaceDetail.id}`,
    });
    console.debug("워크 리스트");
    console.debug(res.works);
    setWorkspaceDetail({
      ...workspaceDetail,
      works: res.works,
    });
  };

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
    console.debug(eventInfo.event);
    let isChecked = false;
    workspaceDetail.works.forEach((work) => {
      if (work.id === eventInfo.event.id) {
        isChecked = work.isFinished;
      }
    });
    return (
      <div className="relative flex items-center overflow-hidden cursor-pointer">
        <p className="pl-1 mt-0.5 text-black w-full overflow-hidden">
          {eventInfo.event.title}
        </p>
        {isChecked === "1" && (
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

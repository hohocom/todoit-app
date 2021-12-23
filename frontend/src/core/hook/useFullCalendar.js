/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSetWorkspaceDetail } from "core/hook";
import useAxios from "./useAxios";
import { useRecoilState } from "recoil";
import { workDetailModalState } from "core/state";

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
    console.debug("getWorks");
    const res = await customAxios({
      method: "get",
      url: `/works?workspaceId=${workspaceDetail.id}`,
    });
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
        setWorkDetailModal({
          isOpen: true,
          title: work.title,
          content: work.content,
          themeColor: work.color,
          isFinished: work.isFinished,
          workers: work.users,
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
        isChecked = work.isChecked;
      }
    });
    return (
      <div className="flex items-center cursor-pointer">
        {isChecked ? (
          <div className="relative flex items-center justify-center ml-1 mr-1 bg-white rounded-full min-w-4 min-h-4">
            <i
              className="fas fa-check"
              style={{
                color: `${eventInfo.event.backgroundColor}`,
              }}
            ></i>
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-4 h-4 ml-1 mr-1 bg-white rounded-full"></div>
        )}
        <p className="mt-0.5 text-black w-full overflow-hidden">
          {eventInfo.event.title}
        </p>
      </div>
    );
  }

  return { renderEventContent, handleEventClick };
}

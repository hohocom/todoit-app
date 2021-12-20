/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import customAxios from "core/api";
import { useSetWorkspaceDetail } from "core/hook";

export function useFullCalendar() {
  const { workspaceDetail, setWorkspaceDetail } = useSetWorkspaceDetail();
  useEffect(() => {
    console.log("먼저실행됨");
    if (workspaceDetail.id) {
      console.debug("실행되디되도디");
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
    // workspaceDetail.works.forEach((work) => {
    //   if (work.id === Number(args.event.id)) {
    //     setWorkDetail(work);
    //   }
    // });
    // setWorksShowModal(!worksShowModal);
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
      <div className="flex items-center">
        {isChecked ? (
          <div className="relative flex items-center justify-center w-4 h-4 ml-1 mr-1 bg-white rounded-full">
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
        <p className="mt-0.5">{eventInfo.event.title}</p>
      </div>
    );
  }

  return { renderEventContent, handleEventClick };
}
